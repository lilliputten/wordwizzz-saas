'use server';

import { prisma } from '@/lib/db';
// import { TWordsSet } from '@/features/wordsSets/types';
import { DatabaseError } from '@/shared/types/errors';
import { TUserId } from '@/shared/types/TUser';

export type TFetchWordsSetsAction = typeof fetchWordsSetsData;

export async function fetchWordsSetsData(userId: TUserId) {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      // name: true,
      // emailVerified: true,
      languages: true,
      wordsSets: true,
      words: true,
    },
  });
  if (!result) {
    throw new DatabaseError(`No data returned for the user id "${userId}"`);
  }
  const { wordsSets } = result;
  console.log('[WordsSetsPage:fetchWordsSets] result', {
    wordsSets,
    result,
    userId,
  });
  /* // DEBUG: Delay
   * await new Promise((resolve) => setTimeout(resolve, 3000));
   */
  return result;
}
