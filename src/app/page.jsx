import { buildPortfolioTree } from '@/utils/content';
import PortfolioClient from './PortfolioClient';

export default async function Page() {
  const portfolioData = buildPortfolioTree();
  return <PortfolioClient portfolioData={portfolioData} />;
}