import 'server-only';

import { cache } from 'react';
import { auth } from '@/auth';
import { TOptionalExtendedUser } from '@/shared/types/TUser';

export const getCurrentUser = cache<() => Promise<TOptionalExtendedUser>>(async () => {
  const session = await auth();
  if (!session?.user) {
    return undefined;
  }
  return session.user;
});
