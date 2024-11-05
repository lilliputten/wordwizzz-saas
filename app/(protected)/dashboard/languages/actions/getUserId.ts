import { getCurrentUser } from '@/lib/session';

export async function getUserId() {
  const user = await getCurrentUser();
  return user?.id;
}
