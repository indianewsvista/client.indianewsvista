import { Metadata } from 'next';
import { SavedClient } from './saved-client';

export const metadata: Metadata = {
  title: 'Saved Articles - Intel Drift',
  description: 'Your saved articles for later reading.',
};

export default function SavedPage() {
  return <SavedClient />;
}
