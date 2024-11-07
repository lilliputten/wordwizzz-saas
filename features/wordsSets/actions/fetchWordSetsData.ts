'use server';

import { prisma } from '@/lib/db';
// import { TWordsSet } from '@/features/wordsSets/types';
// import { DatabaseError } from '@/shared/types/errors';
import { TUserId } from '@/shared/types/TUser';

export type TFetchWordsSetsAction = typeof fetchWordsSetsData;

export async function fetchWordsSetsData(userId: TUserId) {
  const wordsSetResult = await prisma.wordsSet.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      languages: true,
      // words: true,
    },
  });
  /* // UNUSED
   * const userResult = await prisma.user.findUnique({
   *   where: {
   *     id: userId,
   *   },
   *   select: {
   *     // name: true,
   *     // emailVerified: true,
   *     languages: true,
   *     wordsSets: true,
   *     words: true,
   *   },
   * });
   * if (!userResult) {
   *   throw new DatabaseError(`No data returned for the user id "${userId}"`);
   * }
   */
  console.log('[WordsSetsPage:fetchWordsSets] result', {
    wordsSetResult,
    // wordsSets,
    // userResult,
    userId,
  });
  // DEBUG: Delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return wordsSetResult;
}
