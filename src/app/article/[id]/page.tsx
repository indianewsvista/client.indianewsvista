import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleDetailClient } from './article-detail-client';
import { getArticleById, getArticles } from '@/actions/articles';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - Intel Drift`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleById(id),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter(a => a.id !== id && a.category === article.category)
    .slice(0, 3);

  return <ArticleDetailClient article={article} relatedArticles={relatedArticles} />;
}
