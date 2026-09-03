import type { LucideIcon } from 'lucide-react';

import {
  Bot,
  Boxes,
  Gauge,
  Layers3,
  ShoppingBag,
  Workflow
} from 'lucide-react';

export type InspirationNodeId =
  | 'product'
  | 'ai'
  | 'systems'
  | 'workflow'
  | 'commerce'
  | 'performance'
  | 'architecture';

export type InspirationNode = {
  id: InspirationNodeId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
};

export const inspirationNodes: InspirationNode[] = [
  {
    id: 'product',
    label: 'Product thinking',
    shortLabel: 'Product',
    description:
      'Useful software starts from user goals, business needs and the real outcome people are trying to reach.',
    icon: Layers3
  },
  {
    id: 'ai',
    label: 'AI collaboration',
    shortLabel: 'AI collaboration',
    description:
      'Rcentz combines human judgment with intelligent assistance to move faster, explore better and refine ideas with care.',
    icon: Bot
  },
  {
    id: 'systems',
    label: 'Connected systems',
    shortLabel: 'Connected systems',
    description:
      'Interfaces, logic, backend flows and real business operations should work together instead of behaving like separate pages.',
    icon: Workflow
  },
  {
    id: 'workflow',
    label: 'Business workflows',
    shortLabel: 'Business workflows',
    description:
      'Every strong product is backed by clear process design, structured flow and systems that actually support the work behind the scenes.',
    icon: Boxes
  },
  {
    id: 'commerce',
    label: 'Commerce behaviour',
    shortLabel: 'Commerce',
    description:
      'Discovery, checkout, fulfilment and customer movement all matter when shaping a strong modern commerce experience.',
    icon: ShoppingBag
  },
  {
    id: 'performance',
    label: 'Delivery quality',
    shortLabel: 'Delivery quality',
    description:
      'Performance, structure, scalability and usability must all hold together for a system to remain valuable over time.',
    icon: Gauge
  },
  {
    id: 'architecture',
    label: 'Reusable architecture',
    shortLabel: 'Architecture',
    description:
      'A thoughtful core makes it easier to extend products, reuse ideas and grow from one solution into a broader system.',
    icon: Boxes
  }
];

export const inspirationNodeMap = Object.fromEntries(
  inspirationNodes.map(node => [node.id, node])
) as Record<InspirationNodeId, InspirationNode>;