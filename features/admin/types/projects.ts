export const adminProjectTypeOptions = [
  { value: 'WEBSITE', label: 'Website' },
  { value: 'WEB_APP', label: 'Web application' },
  { value: 'MOBILE_APP', label: 'Mobile application' },
  { value: 'DESKTOP_APP', label: 'Desktop application' },
  { value: 'SAAS', label: 'SaaS' },
  { value: 'API', label: 'API' },
  { value: 'ECOMMERCE', label: 'E-commerce' },
  { value: 'BRANDING', label: 'Branding' },
  { value: 'GRAPHIC_DESIGN', label: 'Graphic design' },
  { value: 'CONSULTING', label: 'Consulting' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'OTHER', label: 'Other' }
] as const;

export const adminProjectStatusOptions = [
  { value: 'PLANNING', label: 'Planning' },
  { value: 'DISCOVERY', label: 'Discovery' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'DEVELOPMENT', label: 'Development' },
  { value: 'TESTING', label: 'Testing' },
  { value: 'REVIEW', label: 'Review' },
  { value: 'DEPLOYMENT', label: 'Deployment' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ON_HOLD', label: 'On hold' },
  { value: 'CANCELLED', label: 'Cancelled' }
] as const;

export const adminProjectVisibilityOptions = [
  { value: 'PRIVATE', label: 'Private' },
  { value: 'UNLISTED', label: 'Unlisted' },
  { value: 'PUBLIC', label: 'Public' }
] as const;

export const adminProjectCurrencyOptions = [
  'NGN',
  'USD',
  'GBP',
  'EUR'
] as const;

export type AdminProjectType = (typeof adminProjectTypeOptions)[number]['value'];

export type AdminProjectStatus = (typeof adminProjectStatusOptions)[number]['value'];

export type AdminProjectVisibility = (typeof adminProjectVisibilityOptions)[number]['value'];

export type AdminProjectCurrency = (typeof adminProjectCurrencyOptions)[number];

export function isAdminProjectType(
  value: string
): value is AdminProjectType {
  return adminProjectTypeOptions.some(option => {
    return option.value === value;
  });
}

export function isAdminProjectStatus(
  value: string
): value is AdminProjectStatus {
  return adminProjectStatusOptions.some(option => {
    return option.value === value;
  });
}

export function isAdminProjectVisibility(
  value: string
): value is AdminProjectVisibility {
  return adminProjectVisibilityOptions.some(option => {
    return option.value === value;
  });
}

export function isAdminProjectCurrency(
  value: string
): value is AdminProjectCurrency {
  return adminProjectCurrencyOptions.some(currency => {
    return currency === value;
  });
}