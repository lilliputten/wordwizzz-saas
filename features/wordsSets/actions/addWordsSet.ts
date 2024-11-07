'use server';

import { prisma } from '@/lib/db';
import { TLanguageId } from '@/features/languages/types';
import { TNewWordsSet, TWordsSet } from '@/features/wordsSets/types';
import { DatabaseError } from '@/shared/types/errors';
import { TUserId } from '@/shared/types/TUser';

export type TAddWordsSetAction = typeof addWordsSet;

// @see:
// - https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-1
// - https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
// - https://www.prisma.io/docs/orm/prisma-client/queries
// - https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function addWordsSet(
  userId: TUserId,
  wordsSet: TNewWordsSet,
  languageIds: TLanguageId[],
) {
  try {
    const { name } = wordsSet;
    const wordsSetRecord = { name };
    // const prismaWordsSet = prisma.wordsSet;
    const prismaUser = prisma.user;
    /* // DEBUG: Fetch current user with related data
     * const user = await prismaUser.findUnique({
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
     * if (!user) {
     *   throw new DatabaseError(`Can't find a user for id "${userId}"`);
     * }
     */
    console.log('[addWordsSet] start', {
      name,
      userId,
      languageIds,
      wordsSet,
      // prismaWordsSet,
      prisma,
    });
    debugger;
    // TODO: Connect with languages form `languageIds`
    const updateResult = await prismaUser.update({
      where: {
        id: userId,
      },
      include: {
        wordsSets: true,
        // languages: true,
        // words: true,
      },
      data: {
        wordsSets: {
          upsert: {
            where: { id: userId },
            create: wordsSetRecord,
            update: wordsSetRecord,
          },
        },
      },
    });
    console.log('[addWordsSet] done', {
      updateResult,
      userId,
      wordsSet,
    });
    // DEBUG: Delay
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return updateResult;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[addWordsSet] Error updating wordsSet', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw error;
  }
}
