import type { SeedProjectManifest } from '../projects';

export const portfolioUISystemSeed: SeedProjectManifest = {
  name: 'Portfolio UI System v0.1',
  slug: 'portfolio-ui-system-v0-1',

  description:
    'A deployed portfolio interface system focused on presenting projects through a structured, reusable and visually rich product experience.',

  purpose:
    'Build a focused portfolio presentation system that can showcase digital work through stronger visual hierarchy, project storytelling and reusable interface patterns.',

  vision:
    'Create a reusable portfolio UI foundation that presents software projects as real product experiences rather than simple thumbnail cards.',

  expectedOutcome:
    'Maintain a deployed v0.1 portfolio interface that can serve as a visual case study and reusable reference for future portfolio presentation work.',

  type: 'WEB_APP',
  status: 'COMPLETED',
  visibility: 'PUBLIC',

  completedAt: '2026-09-02',

  portfolio: {
    tagline:
      'A focused UI system for presenting digital projects as richer product stories.',

    summary:
      'Portfolio UI System v0.1 is a deployed interface experiment centered on reusable project presentation, visual hierarchy and a more deliberate portfolio browsing experience.',

    challenge:
      'Traditional portfolio layouts often reduce substantial software projects to small cards, screenshots and short descriptions that do not communicate the depth of the underlying work.',

    solution:
      'Develop a dedicated portfolio interface that gives project presentation more space, stronger hierarchy and reusable visual structures while keeping navigation and browsing simple.',

    outcome:
      'The v0.1 interface was deployed as a standalone portfolio presentation system and now serves as an additional Rcentz portfolio case study.',

    liveUrl:
      'https://portfolio-ui-system-v0-1.vercel.app',

    repositoryUrl:
      'https://github.com/devkiddz/portfolio-ui-system-v0.1',

    featured: true,
    publishedAt: '2026-09-02'
  },

  /*
   * The public GitHub repository is currently empty, so we deliberately
   * do not invent an implementation stack here. Add technologies when
   * the source is available or the stack is explicitly confirmed.
   */
  technologies: [],

  milestones: [
    {
      title: 'Portfolio UI System v0.1 Deployment',
      slug: 'portfolio-ui-system-v0-1-deployment',

      description:
        'Published the first deployed version of the standalone portfolio UI system.',

      purpose:
        'Establish a working public reference for the portfolio presentation concept.',

      expectedOutcome:
        'A publicly accessible v0.1 interface ready to be presented as part of the Rcentz project portfolio.',

      status: 'COMPLETED',
      priority: 'HIGH',
      visibility: 'PUBLIC',
      sortOrder: 1,
      completedAt: '2026-09-02',

      completionNotes:
        'Public deployment verified at portfolio-ui-system-v0-1.vercel.app.'
    }
  ]
};
