import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryClient } from './category-client';
import { getArticlesByCategory } from '@/actions/articles';
import { categories } from '@/data/mockData';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = categories.find(c => c.id === category);
  
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

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryInfo = categories.find(c => c.id === category);
  
  if (!categoryInfo) {
    notFound();
  }

  const articles = await getArticlesByCategory(category);

  return <CategoryClient category={category} categoryInfo={categoryInfo} initialArticles={articles} />;
}
