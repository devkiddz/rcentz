export type ExpandedServiceProjectType =
  | "WEBSITE"
  | "WEB_APP"
  | "MOBILE_APP"
  | "SAAS"
  | "ECOMMERCE"
  | "MAINTENANCE"
  | "CONSULTING";

export type ExpandedServicePrice = {
  currency: "NGN" | "USD";
  priceFrom: number;
  priceTo: number;
};

export type ExpandedService = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  type: ExpandedServiceProjectType;
  status: "ACTIVE";
  prices: ExpandedServicePrice[];
  featured: boolean;
};

export type ExpandedServiceCategory = {
  name: string;
  slug: string;
  description: string;
  services: ExpandedService[];
};

function prices(
  ngnFrom: number,
  ngnTo: number,
  usdFrom: number,
  usdTo: number,
): ExpandedServicePrice[] {
  return [
    {
      currency: "NGN",
      priceFrom: ngnFrom,
      priceTo: ngnTo,
    },
    {
      currency: "USD",
      priceFrom: usdFrom,
      priceTo: usdTo,
    },
  ];
}

export const expandedServiceSeedManifest: ExpandedServiceCategory[] = [
  {
    name: "Financial & Regulated Platforms",
    slug: "financial-regulated-platforms",
    description:
      "Secure financial interfaces, operational dashboards and transaction-aware platforms for regulated businesses and financial technology products.",
    services: [
      {
        name: "Fintech Dashboard Development",
        slug: "fintech-dashboard-development",
        shortDescription:
          "Modern fintech dashboards for balances, transactions, customer activity, reporting and operational visibility.",
        description:
          "Design and develop secure fintech dashboard experiences around customer accounts, balances, transaction records, reporting, operational workflows, user roles and provider integrations appropriate to the product.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(900000, 7000000, 1500, 10000),
        featured: true,
      },
      {
        name: "Online Banking Portal Development",
        slug: "online-banking-portal-development",
        shortDescription:
          "Customer and staff banking portals designed around accounts, transfers, statements and secure workflows.",
        description:
          "Develop online banking portal interfaces and supporting application workflows for licensed financial organisations, including account views, transaction history, beneficiary flows, statements, notifications, permissions and administrative operations.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(1500000, 12000000, 2500, 18000),
        featured: true,
      },
      {
        name: "Broker & Trading Dashboard Development",
        slug: "broker-trading-dashboard-development",
        shortDescription:
          "Trading and brokerage dashboards for portfolios, positions, performance, activity and account management.",
        description:
          "Build brokerage and trading dashboard experiences around portfolios, positions, account activity, performance reporting, market-data integrations, permissions and operational administration for appropriately licensed operators.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(1400000, 12000000, 2200, 18000),
        featured: true,
      },
      {
        name: "Digital Wallet & Payment Portal",
        slug: "digital-wallet-payment-portal",
        shortDescription:
          "Wallet and payment interfaces for deposits, withdrawals, transfers, transaction history and reconciliation.",
        description:
          "Develop wallet and payment portal experiences with transaction ledgers, customer activity, payment-provider integrations, reconciliation workflows, notifications and appropriate administrative controls.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(1200000, 9000000, 2000, 14000),
        featured: false,
      },
      {
        name: "Investment & Wealth Dashboard",
        slug: "investment-wealth-dashboard",
        shortDescription:
          "Clear investment dashboards for holdings, portfolio performance, activity and client reporting.",
        description:
          "Build investment and wealth-management interfaces for appropriately licensed businesses, presenting holdings, portfolio allocation, performance, statements, account activity and client reporting through structured dashboards.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(1000000, 8000000, 1700, 12000),
        featured: false,
      },
    ],
  },

  {
    name: "Logistics & Tracking Systems",
    slug: "logistics-tracking-systems",
    description:
      "Delivery, dispatch and logistics platforms that connect customers, parcels, riders, fleets and operational teams through one trackable workflow.",
    services: [
      {
        name: "Courier & Parcel Tracking Website",
        slug: "courier-parcel-tracking-website",
        shortDescription:
          "Customer-facing tracking websites where shipments can be followed from dispatch to delivery.",
        description:
          "Develop courier and parcel-tracking websites with shipment references, status timelines, customer tracking pages, delivery updates, operational data and administrative management.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(500000, 3500000, 800, 5500),
        featured: true,
      },
      {
        name: "Delivery Management System",
        slug: "delivery-management-system",
        shortDescription:
          "Manage deliveries, assignments, statuses, customers and operational activity from one application.",
        description:
          "Build delivery-management software around orders, parcel records, assignments, delivery statuses, customer information, operational dashboards, notifications and reporting.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(900000, 7000000, 1500, 10000),
        featured: true,
      },
      {
        name: "Dispatch & Rider Dashboard",
        slug: "dispatch-rider-dashboard",
        shortDescription:
          "Focused dispatch tools for assigning jobs, monitoring riders and managing delivery progress.",
        description:
          "Develop dispatch and rider-management dashboards with assignment workflows, rider status, delivery queues, activity records, operational visibility and mobile-conscious interfaces.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(700000, 5000000, 1100, 7500),
        featured: false,
      },
      {
        name: "Fleet Management System",
        slug: "fleet-management-system",
        shortDescription:
          "Operational software for vehicles, drivers, assignments, maintenance records and fleet activity.",
        description:
          "Build fleet-management applications that organise vehicles, drivers, assignments, maintenance records, operational status, reporting and related logistics workflows.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(1000000, 8000000, 1700, 12000),
        featured: false,
      },
      {
        name: "Logistics Operations Platform",
        slug: "logistics-operations-platform",
        shortDescription:
          "A connected logistics platform for shipments, routes, teams, customers and operational reporting.",
        description:
          "Architect and develop broader logistics systems combining shipment management, customer records, operational teams, delivery statuses, routes, reporting and administrative workflows.",
        type: "SAAS",
        status: "ACTIVE",
        prices: prices(1500000, 12000000, 2500, 18000),
        featured: false,
      },
    ],
  },

  {
    name: "Gaming & Interactive Platforms",
    slug: "gaming-interactive-platforms",
    description:
      "Account-driven gaming and interactive product experiences with dashboards, wallets, activity history and operational administration.",
    services: [
      {
        name: "Gaming Platform Development",
        slug: "gaming-platform-development",
        shortDescription:
          "Account-driven gaming platforms with player experiences, activity history and administrative operations.",
        description:
          "Design and develop gaming platform interfaces and supporting application workflows around user accounts, content or game integrations, activity history, notifications and administration.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(1200000, 10000000, 2000, 15000),
        featured: true,
      },
      {
        name: "Casino Platform Interface Development",
        slug: "casino-platform-interface-development",
        shortDescription:
          "Modern casino product interfaces for licensed operators, covering players, wallets, activity and administration.",
        description:
          "Develop casino platform interfaces and operational dashboards for appropriately licensed operators, including player accounts, wallet views, transaction history, game-provider integrations, activity records and administrative workflows.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(1800000, 15000000, 3000, 22000),
        featured: true,
      },
      {
        name: "Player Account & Wallet Dashboard",
        slug: "player-account-wallet-dashboard",
        shortDescription:
          "Structured player dashboards for account activity, wallet history, profile information and platform status.",
        description:
          "Build account and wallet dashboard experiences for gaming products, including player profiles, balances, transaction records, platform activity, notifications and appropriate administrative visibility.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(700000, 5000000, 1100, 7500),
        featured: false,
      },
      {
        name: "Gaming Administration Dashboard",
        slug: "gaming-administration-dashboard",
        shortDescription:
          "Operational dashboards for users, content, activity, support, reporting and platform administration.",
        description:
          "Develop administration dashboards for gaming and interactive products with user management, activity visibility, content operations, support workflows, reporting and configurable operational controls.",
        type: "WEB_APP",
        status: "ACTIVE",
        prices: prices(800000, 6000000, 1300, 9000),
        featured: false,
      },
      {
        name: "Interactive Rewards & Loyalty Platform",
        slug: "interactive-rewards-loyalty-platform",
        shortDescription:
          "Engagement systems for rewards, points, achievements, loyalty activity and account experiences.",
        description:
          "Build interactive rewards and loyalty platforms around user accounts, points, achievements, activity records, campaigns, notifications and administrative management.",
        type: "SAAS",
        status: "ACTIVE",
        prices: prices(800000, 6000000, 1300, 9000),
        featured: false,
      },
    ],
  },
];
