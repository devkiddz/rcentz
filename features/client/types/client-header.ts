export type ClientHeaderNotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  href: string | null;
  unread: boolean;
  timeLabel: string;
};

export type ClientHeaderMessage = {
  id: string;
  title: string;
  senderName: string;
  senderImage: string | null;
  preview: string;
  unread: boolean;
  timeLabel: string;
};

export type ClientHeaderFeed = {
  notifications: ClientHeaderNotification[];
  unreadNotificationCount: number;

  messages: ClientHeaderMessage[];
  hasUnreadMessages: boolean;
};