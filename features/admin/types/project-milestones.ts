export const adminProjectMilestoneStatusOptions = [
  {
    value: 'PLANNED',
    label: 'Planned'
  },
  {
    value: 'IN_PROGRESS',
    label: 'In progress'
  },
  {
    value: 'BLOCKED',
    label: 'Blocked'
  },
  {
    value: 'REVIEW',
    label: 'Review'
  },
  {
    value: 'COMPLETED',
    label: 'Completed'
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled'
  }
] as const;

export const adminProjectMilestonePriorityOptions = [
  {
    value: 'LOW',
    label: 'Low'
  },
  {
    value: 'NORMAL',
    label: 'Normal'
  },
  {
    value: 'HIGH',
    label: 'High'
  },
  {
    value: 'CRITICAL',
    label: 'Critical'
  }
] as const;

export const adminProjectMilestoneVisibilityOptions = [
  {
    value: 'INTERNAL',
    label: 'Internal'
  },
  {
    value: 'CLIENT',
    label: 'Client'
  },
  {
    value: 'PUBLIC',
    label: 'Public'
  }
] as const;

export type AdminProjectMilestoneStatus =
  (typeof adminProjectMilestoneStatusOptions)[number]['value'];

export type AdminProjectMilestonePriority =
  (typeof adminProjectMilestonePriorityOptions)[number]['value'];

export type AdminProjectMilestoneVisibility =
  (typeof adminProjectMilestoneVisibilityOptions)[number]['value'];

export function isAdminProjectMilestoneStatus(
  value: string
): value is AdminProjectMilestoneStatus {
  return adminProjectMilestoneStatusOptions.some(option => {
    return option.value === value;
  });
}

export function isAdminProjectMilestonePriority(
  value: string
): value is AdminProjectMilestonePriority {
  return adminProjectMilestonePriorityOptions.some(option => {
    return option.value === value;
  });
}

export function isAdminProjectMilestoneVisibility(
  value: string
): value is AdminProjectMilestoneVisibility {
  return adminProjectMilestoneVisibilityOptions.some(option => {
    return option.value === value;
  });
}