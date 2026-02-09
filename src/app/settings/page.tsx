import { Metadata } from 'next';
import { SettingsClient } from './settings-client';

export const metadata: Metadata = {
  title: 'Settings - Intel Drift',
  description: 'Configure your preferences and account settings.',
};

export default function SettingsPage() {
  return <SettingsClient />;
}
