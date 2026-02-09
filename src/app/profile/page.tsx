import { Metadata } from 'next';
import { ProfileClient } from './profile-client';

export const metadata: Metadata = {
  title: 'Profile - Intel Drift',
  description: 'Manage your profile and preferences.',
};

export default function ProfilePage() {
  return <ProfileClient />;
}
