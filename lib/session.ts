import 'server-only';

import { cache } from 'react';
import { auth, TOptionalExtendedUser } from '@/auth';

export const getCurrentUser = cache<() => Promise<TOptionalExtendedUser>>(async () => {
  const session = await auth();
  if (!session?.user) {
    return undefined;
  }
  return session.user;
});
