import type { Metadata } from 'next';
import InsightsPage from './InsightsPage';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Perspectives on technology, AI, and operational systems',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <InsightsPage />;
}
