'use client';

import {
  Bell,
  Bitcoin,
  Check,
  CheckCircle2,
  CreditCard,
  MapPin,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
  UserRound,
  WalletCards
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const STEPS = [
  {
    label: 'Product selected',
    customer: 'This is the one.',
    status: 'Selection active',
    notification: 'Studio Workstation selected.',
    icon: ShoppingBag
  },
  {
    label: 'Checkout created',
    customer: 'Ready to checkout.',
    status: 'Cart secured',
    notification: 'Checkout created for Order RC-2048.',
    icon: ShoppingCart
  },
  {
    label: 'Payment verified',
    customer: 'Payment sent.',
    status: 'Transaction verified',
    notification: 'Payment successfully verified.',
    icon: CreditCard
  },
  {
    label: 'Order processing',
    customer: 'Order received.',
    status: 'Preparing package',
    notification: 'Order is being prepared for dispatch.',
    icon: PackageCheck
  },
  {
    label: 'Out for delivery',
    customer: 'Almost here.',
    status: 'Courier assigned',
    notification: 'Courier assigned. Order is on the way.',
    icon: Truck
  },
  {
    label: 'Delivered',
    customer: 'Perfect. It arrived.',
    status: 'Order completed',
    notification: 'Delivered successfully.',
    icon: Check
  }
] as const;

const GATEWAYS = ['Paystack', 'Flutterwave', 'Stripe'] as const;

const CRYPTO_RAILS = ['USDT', 'BTC', 'USDC'] as const;

const STEP_DURATION = 1900;
const GATEWAY_DURATION = 1050;

const ORDER = {
  id: 'RC-2048',
  product: 'Studio Workstation',
  category: 'Computer systems',
  quantity: 1,
  amount: '₦128,500',
  destination: 'Customer address'
} as const;

function DigitalPanelSurface() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div
        className={[
          'absolute inset-0',
          'opacity-60',
          'bg-[linear-gradient(to_right,var(--theme-accent-faint)_1px,transparent_1px),linear-gradient(to_bottom,var(--theme-accent-faint)_1px,transparent_1px)]',
          'bg-[size:18px_18px]'
        ].join(' ')}
      />

      <div className="absolute left-[12%] top-[20%] h-px w-[28%] bg-theme-accent/15" />
      <div className="absolute left-[40%] top-[20%] h-[22%] w-px bg-theme-accent/15" />

      <div className="absolute bottom-[20%] right-[12%] h-px w-[24%] bg-theme-accent/15" />
      <div className="absolute bottom-[20%] right-[36%] h-[18%] w-px bg-theme-accent/15" />

      <span className="absolute left-[39%] top-[18%] size-1 rounded-full bg-theme-accent/70 shadow-[0_0_8px_var(--theme-accent)]" />
      <span className="absolute bottom-[18%] right-[34%] size-1 rounded-full bg-theme-accent/55 shadow-[0_0_8px_var(--theme-accent)]" />
      <span className="absolute right-[8%] top-[9%] size-1 rounded-full border border-theme-accent/50" />
    </div>
  );
}

export function CommerceJourneyStory() {
  const [step, setStep] = useState(0);
  const [gatewayIndex, setGatewayIndex] = useState(0);

  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduceMotion || step >= STEPS.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStep(current => current + 1);
    }, STEP_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [step, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || step < 2) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setGatewayIndex(current => (current + 1) % GATEWAYS.length);
    }, GATEWAY_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [gatewayIndex, reduceMotion, step]);

  const visibleStep = reduceMotion ? STEPS.length - 1 : step;
  const visibleGatewayIndex = reduceMotion ? 0 : gatewayIndex;

  const current = STEPS[visibleStep];
  const CurrentIcon = current.icon;

  const checkoutExpanded = visibleStep >= 1;
  const paymentActive = visibleStep >= 2;
  const notificationCount = visibleStep + 1;

  return (
    <div className="relative min-h-[430px] overflow-visible">
      <div
        aria-hidden="true"
        className={[
          'absolute',
          'left-[52%] top-[48%]',
          'size-[370px]',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'rounded-full',
          'bg-theme-accent-faint',
          'blur-[110px]'
        ].join(' ')}
      />

      {/* CUSTOMER */}

      <div className="absolute left-[1%] top-[7%] z-40">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={[
            'relative',
            'flex size-16',
            'items-center justify-center',
            'overflow-hidden',
            'rounded-full',
            'border border-border',
            'bg-background/90',
            'shadow-xl',
            'backdrop-blur-xl'
          ].join(' ')}>
          <DigitalPanelSurface />

          <UserRound className="relative z-10 size-6 text-theme-accent" />
        </motion.div>

        <p className="mt-2 text-center text-[10px] font-medium">Customer</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.customer}
          initial={{ x: -8, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 8, opacity: 0 }}
          className={[
            'absolute',
            'left-[10%] top-[8%]',
            'z-40',
            'overflow-hidden',
            'rounded-full',
            'border border-border',
            'bg-background/88',
            'px-4 py-2.5',
            'shadow-lg',
            'backdrop-blur-xl'
          ].join(' ')}>
          <DigitalPanelSurface />

          <p className="relative z-10 text-[10px] text-muted">{current.customer}</p>
        </motion.div>
      </AnimatePresence>

      {/* PRODUCT */}

      <motion.div
        animate={{
          x: checkoutExpanded ? 165 : 0,
          y: checkoutExpanded ? -58 : 0,
          scale: checkoutExpanded ? 0.58 : 1,
          opacity: checkoutExpanded ? 0 : 1
        }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={[
          'absolute',
          'left-[3%] top-[34%]',
          'z-30',
          'w-[185px]',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/88',
          'p-4',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <DigitalPanelSurface />

        <div className="relative z-10">
          <div className="flex h-[78px] items-center justify-center rounded-xl border border-theme-accent/15 bg-theme-accent-soft">
            <ShoppingBag className="size-7 text-theme-accent" />
          </div>

          <p className="mt-3 text-[13px] font-semibold">{ORDER.product}</p>

          <p className="mt-1 text-[9px] text-muted">{ORDER.category}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold">{ORDER.amount}</span>

            <span className="font-mono text-[8px] text-theme-accent">selected</span>
          </div>
        </div>
      </motion.div>

      {/* ORDER ENGINE */}

      <motion.div
        animate={{
          left: checkoutExpanded ? '22%' : '38%',
          width: checkoutExpanded ? 335 : 225
        }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={[
          'absolute',
          'top-[12%]',
          'z-30',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/90',
          'p-4',
          'shadow-2xl',
          'backdrop-blur-2xl'
        ].join(' ')}>
        <DigitalPanelSurface />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-theme-accent-soft">
                <ShoppingCart className="size-4 text-theme-accent" />
              </span>

              <div>
                <p className="text-[13px] font-semibold">Order {ORDER.id}</p>

                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                  Commerce engine
                </p>
              </div>
            </div>

            <span className="flex size-6 items-center justify-center rounded-full bg-theme-accent-soft text-[9px] font-semibold text-theme-accent">
              1
            </span>
          </div>

          <AnimatePresence>
            {checkoutExpanded ? (
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-[11px] font-medium">{ORDER.product}</p>

                  <p className="mt-1 font-mono text-[8px] text-muted">
                    {ORDER.category} · Qty {ORDER.quantity}
                  </p>
                </div>

                <p className="text-[12px] font-semibold">{ORDER.amount}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {paymentActive ? (
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-3 flex items-center justify-between rounded-xl border border-theme-accent/10 bg-background/65 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-3.5 text-theme-accent" />

                  <span className="text-[9px]">Payment secured</span>
                </div>

                <CheckCircle2 className="size-3.5 text-theme-accent" />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-2">
            <span className="size-2 rounded-full bg-theme-accent" />

            <AnimatePresence mode="wait">
              <motion.span
                key={current.status}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                className="font-mono text-[8px] uppercase tracking-[0.11em] text-muted">
                {current.status}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ATM */}

      <AnimatePresence>
        {paymentActive ? (
          <motion.div
            initial={{ x: -30, opacity: 0, rotateY: -18 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            className={[
              'absolute',
              'left-[2%] top-[34%]',
              'z-40',
              'h-[116px]',
              'w-[190px]',
              'overflow-hidden',
              'rounded-2xl',
              'border border-theme-accent/25',
              'bg-background/92',
              'p-4',
              'shadow-2xl',
              'backdrop-blur-xl'
            ].join(' ')}>
            <DigitalPanelSurface />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="relative h-7 w-9 overflow-hidden rounded-md border border-theme-accent/30 bg-theme-accent-soft">
                  <div className="absolute inset-x-1 top-1/2 h-px bg-theme-accent/35" />
                  <div className="absolute inset-y-1 left-1/2 w-px bg-theme-accent/35" />
                </div>

                <WalletCards className="size-4 text-theme-accent" />
              </div>

              <p className="mt-4 font-mono text-[11px] tracking-[0.18em]">•••• •••• •••• 2048</p>

              <div className="mt-2 flex justify-between">
                <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                  RCENTZ CLIENT
                </span>

                <span className="font-mono text-[7px] text-muted">08/29</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* NOTIFICATIONS */}

      <div
        className={[
          'absolute',
          'left-[2%] top-[64%]',
          'z-50',
          'w-[190px]',
          'overflow-hidden',
          'rounded-2xl',
          'border border-border',
          'bg-background/92',
          'p-3.5',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <DigitalPanelSurface />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex size-8 items-center justify-center rounded-lg bg-theme-accent-soft">
                <Bell className="size-3.5 text-theme-accent" />

                <motion.span
                  key={notificationCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className={[
                    'absolute',
                    '-right-1.5 -top-1.5',
                    'flex min-w-4',
                    'items-center justify-center',
                    'rounded-full',
                    'bg-red-500',
                    'px-1',
                    'text-[7px]',
                    'font-bold',
                    'leading-4',
                    'text-white',
                    'shadow-lg'
                  ].join(' ')}>
                  {notificationCount}
                </motion.span>
              </div>

              <div>
                <p className="text-[10px] font-semibold">Notifications</p>

                <p className="font-mono text-[6px] uppercase tracking-[0.12em] text-muted">unread updates</p>
              </div>
            </div>

            <span className="size-2 rounded-full bg-red-500" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.notification}
              initial={{ y: 7, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={[
                'mt-3',
                'rounded-xl',
                visibleStep === STEPS.length - 1
                  ? 'border border-theme-accent/25 bg-theme-accent-soft'
                  : 'border border-border bg-background/60',
                'px-3 py-2.5'
              ].join(' ')}>
              <div className="flex items-start gap-2">
                <span
                  className={[
                    'mt-1 size-1.5 shrink-0 rounded-full',
                    visibleStep === STEPS.length - 1 ? 'bg-theme-accent' : 'bg-red-500'
                  ].join(' ')}
                />

                <div>
                  <p className="text-[8px] font-medium leading-4">{current.notification}</p>

                  <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                    Order {ORDER.id}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* PAYMENT ROUTING */}

      <AnimatePresence>
        {paymentActive ? (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={[
              'absolute',
              'right-[2%] top-[27%]',
              'z-40',
              'w-[190px]',
              'overflow-hidden',
              'rounded-2xl',
              'border border-theme-accent/20',
              'bg-background/92',
              'p-4',
              'shadow-xl',
              'backdrop-blur-xl'
            ].join(' ')}>
            <DigitalPanelSurface />

            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-theme-accent-soft">
                  <CreditCard className="size-3.5 text-theme-accent" />
                </span>

                <div>
                  <p className="text-[11px] font-semibold">Payment routing</p>

                  <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.11em] text-muted">
                    Gateway options
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-border bg-background/65 px-3 py-2.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={GATEWAYS[visibleGatewayIndex]}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-theme-accent" />

                    <span className="text-[11px] font-semibold">{GATEWAYS[visibleGatewayIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <Bitcoin className="size-3.5 text-theme-accent" />

                  <p className="text-[9px] font-medium">Alternative rails</p>
                </div>

                <div className="mt-2 flex gap-1.5">
                  {CRYPTO_RAILS.map(rail => (
                    <span
                      key={rail}
                      className="rounded-full border border-theme-accent/20 bg-theme-accent-soft px-2 py-1 font-mono text-[7px] font-medium text-theme-accent">
                      {rail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* FULFILMENT — NARROWER */}

      <AnimatePresence>
        {visibleStep >= 3 ? (
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={[
              'absolute',
              'bottom-[5%]',
              'left-[40%]',
              'right-[6%]',
              'z-30',
              'overflow-hidden',
              'rounded-2xl',
              'border border-border',
              'bg-background/88',
              'px-4 py-3',
              'shadow-xl',
              'backdrop-blur-xl'
            ].join(' ')}>
            <DigitalPanelSurface />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PackageCheck className="size-4 text-theme-accent" />

                  <div>
                    <p className="text-[11px] font-semibold">Fulfilment</p>

                    <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                      Order {ORDER.id}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-[8px] text-theme-accent">{current.label}</span>
              </div>

              <div className="relative mt-4 h-[54px]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 500 54"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full text-theme-accent">
                  <path
                    d="M10 29 C110 5 180 48 275 26 C360 8 410 38 490 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                    opacity="0.28"
                  />
                </svg>

                <span className="absolute left-0 top-[20px] size-3 rounded-full border-2 border-background bg-theme-accent" />

                <div className="absolute right-0 top-[2px] flex items-center gap-1.5">
                  <MapPin className="size-3 text-theme-accent" />

                  <span className="text-[8px] text-muted">{ORDER.destination}</span>
                </div>

                {visibleStep >= 4 ? (
                  <motion.div
                    initial={{
                      left: '2%',
                      top: 15
                    }}
                    animate={{
                      left: visibleStep >= 5 ? '88%' : '62%',
                      top: visibleStep >= 5 ? 3 : 14
                    }}
                    transition={{
                      duration: 1.35,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute z-20 flex size-8 items-center justify-center rounded-full border border-theme-accent/30 bg-background shadow-lg">
                    <Truck className="size-4 text-theme-accent" />
                  </motion.div>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
