export type NotificationHistoryItem = {
  id: string;
  type: string;

  title: string;
  message: string;

  href: string | null;

  entityType: string | null;
  entityId: string | null;

  unread: boolean;

  timeLabel: string;
  createdLabel: string;
};

export type NotificationHistoryData = {
  items: NotificationHistoryItem[];

  page: number;
  pageSize: number;

  totalPages: number;
  totalCount: number;

  unreadCount: number;
};