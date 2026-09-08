export type ProjectMonitorHealthStatus =
  | 'ON_TRACK'
  | 'ATTENTION'
  | 'AT_RISK';

export type ProjectMonitorMilestone = {
  id: string;
  title: string;
  status: string;
  progress: number;
};

export type ProjectMonitorData = {
  id: string;
  name: string;
  slug: string;

  status: string;
  progress: number;

  expectedEndAt: Date | null;
  updatedAt: Date;

  screenshot: {
    url: string;
    alt: string | null;
    caption: string | null;
  } | null;

  milestones: ProjectMonitorMilestone[];

  milestoneSummary: {
    total: number;
    completed: number;
    inProgress: number;
    review: number;
    blocked: number;
    planned: number;
    cancelled: number;
    overdue: number;
    dueSoon: number;
  };

  taskSummary: {
    total: number;
    completed: number;
    open: number;
    blocked: number;
    review: number;
  };

  pageSummary: {
    total: number;
    healthy: number;
    inProgress: number;
    attention: number;
    blocked: number;
  };

  nextMilestone: {
    id: string;
    title: string;
    status: string;
    progress: number;
  } | null;

  health: {
    status: ProjectMonitorHealthStatus;
    label: string;
    reason: string;
  };

  deliverySignals: {
    isProjectOverdue: boolean;
    isProjectStale: boolean;
    overdueMilestones: number;
    dueSoonMilestones: number;
  };
};