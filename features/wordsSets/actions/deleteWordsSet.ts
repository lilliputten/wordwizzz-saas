'use server';

import { prisma } from '@/lib/db';
import { TWordsSetId } from '@/features/wordsSets/types';
import { TUserId } from '@/shared/types/TUser';

export type TDeleteWordsSetAction = typeof deleteWordsSet;

export async function deleteWordsSet(userId: TUserId, wordsSetId: TWordsSetId) {
  try {
    const prismaUser = prisma.user;
    console.log('[deleteWordsSet] start', {
      userId,
      wordsSetId,
      prismaUser,
      prisma,
    });
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
        // @see:
        // - https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-1
        wordsSets: {
          delete: {
            id: wordsSetId,
          },
        },
      },
    });
    console.log('[deleteWordsSet] done', {
      updateResult,
      userId,
      wordsSetId,
    });
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 5000));
     */
    return updateResult;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteWordsSet] Error updating words set', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw error;
  }
}
