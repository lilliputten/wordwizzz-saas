import { getCurrentUser } from '@/lib/session';

// NOTE: Is it used?

export async function getUserId() {
  const user = await getCurrentUser();
  return user?.id;
}
