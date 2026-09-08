(function () {
  'use strict';

  var currentScript = document.currentScript;

  if (!currentScript) {
    return;
  }

  var projectId = currentScript.getAttribute('data-project-id');

  var analyticsEndpoint = currentScript.getAttribute('data-endpoint');

  if (!projectId || !analyticsEndpoint) {
    return;
  }

  var sessionStorageKey = 'rcentz_analytics_session';

  function createSessionKey() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return [Date.now(), Math.random().toString(36).slice(2), Math.random().toString(36).slice(2)].join('-');
  }

  function getSessionKey() {
    try {
      var existingSession = sessionStorage.getItem(sessionStorageKey);

      if (existingSession) {
        return existingSession;
      }

      var newSession = createSessionKey();

      sessionStorage.setItem(sessionStorageKey, newSession);

      return newSession;
    } catch {
      return createSessionKey();
    }
  }

  var sessionKey = getSessionKey();

  function sendEvent(type, metadata) {
    var payload = {
      projectId: projectId,
      sessionKey: sessionKey,
      type: type,
      path: window.location.pathname + window.location.search,
      metadata: metadata || {}
    };

    var serializedPayload = JSON.stringify(payload);

    if (typeof navigator.sendBeacon === 'function') {
      var analyticsBlob = new Blob([serializedPayload], {
        type: 'application/json'
      });

      var sent = navigator.sendBeacon(analyticsEndpoint, analyticsBlob);

      if (sent) {
        return;
      }
    }

    fetch(analyticsEndpoint, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: serializedPayload,

      keepalive: true
    }).catch(function () {
      // Analytics must never interrupt
      // the host application.
    });
  }

  function getElementIdentity(element) {
    if (!element) {
      return {};
    }

    return {
      tag: element.tagName?.toLowerCase() ?? null,

      id: element.id || null,

      name: element.getAttribute('name'),

      href: element.getAttribute('href'),

      analyticsAction: element.getAttribute('data-rcentz-action'),

      analyticsLabel: element.getAttribute('data-rcentz-label')
    };
  }

  function handleDocumentClick(event) {
    var target =
      event.target instanceof Element
        ? event.target.closest(['a', 'button', '[data-rcentz-action]'].join(','))
        : null;

    if (!target) {
      return;
    }

    sendEvent('CLICK', getElementIdentity(target));
  }

  function trackFunction(functionName, metadata) {
    if (!functionName) {
      return;
    }

    sendEvent(
      'OTHER',
      Object.assign({}, metadata || {}, {
        eventCategory: 'FUNCTION',
        functionName: functionName
      })
    );
  }

  function trackConversion(conversionType, metadata) {
    var allowedConversions = ['CHECKOUT_STARTED', 'PURCHASE', 'SERVICE_REQUEST', 'SIGN_UP'];

    var eventType = allowedConversions.indexOf(conversionType) >= 0 ? conversionType : 'OTHER';

    sendEvent(
      eventType,
      Object.assign({}, metadata || {}, {
        eventCategory: 'CONVERSION',
        conversionType: conversionType
      })
    );
  }

  window.RcentzAnalytics = {
    track: sendEvent,
    trackFunction: trackFunction,
    trackConversion: trackConversion
  };

  sendEvent('PAGE_VIEW', {
    title: document.title,

    referrer: document.referrer || null
  });

  document.addEventListener('click', handleDocumentClick, {
    passive: true
  });
})();
