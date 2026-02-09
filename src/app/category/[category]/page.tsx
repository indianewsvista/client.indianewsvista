import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryClient } from './category-client';
import { getArticlesByCategory } from '@/actions/articles';
import { categories } from '@/data/mockData';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryInfo = categories.find(c => c.id === params.category);
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryInfo.label} - Intel Drift`,
    description: `Browse ${categoryInfo.label.toLowerCase()} articles and news.`,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryInfo = categories.find(c => c.id === params.category);
  
  if (!categoryInfo) {
    notFound();
  }

  const articles = await getArticlesByCategory(params.category);

  return <CategoryClient category={params.category} categoryInfo={categoryInfo} initialArticles={articles} />;
}
