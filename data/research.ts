export type Topic = { title: string; slug: string };
export type ResearchPost = {
  title: string;
  slug: string;
  dek: string;
  publishedAt: string;
  estimatedReadMinutes: number;
  topics: Topic[];
};

export const mockPosts: ResearchPost[] = [
  {
    title: 'Executive compensation structure and governance accountability',
    slug: 'executive-compensation-structure-governance-accountability',
    dek: 'A close read of board-level decisions and long-term shareholder consequences.',
    publishedAt: '2026-04-14',
    estimatedReadMinutes: 8,
    topics: [{ title: 'Corporate Governance', slug: 'corporate-governance' }],
  },
  {
    title: 'Pension exposure and the public cost of private deal leverage',
    slug: 'pension-exposure-and-private-deal-leverage',
    dek: 'How liability assumptions, leverage, and policy design combine to amplify risk.',
    publishedAt: '2025-10-03',
    estimatedReadMinutes: 6,
    topics: [{ title: 'Pensions & Retirement', slug: 'pensions-retirement' }],
  },
];
