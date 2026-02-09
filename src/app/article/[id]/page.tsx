import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleDetailClient } from './article-detail-client';
import { getArticleById, getArticles } from '@/actions/articles';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getArticleById(params.id);
  
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

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const [article, allArticles] = await Promise.all([
    getArticleById(params.id),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter(a => a.id !== params.id && a.category === article.category)
    .slice(0, 3);

  return <ArticleDetailClient article={article} relatedArticles={relatedArticles} />;
}
