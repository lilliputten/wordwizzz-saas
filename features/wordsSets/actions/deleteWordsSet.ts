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
    const removedWordsSet = await prisma.wordsSet.delete({
      where: {
        userId: userId,
        id: wordsSetId,
      },
      select: {
        id: true,
        name: true,
        languages: true,
        // words: true,
      },
    });
    /*
    const updateResultOld = await prismaUser.update({
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
    */
    console.log('[deleteWordsSet] done', {
      removedWordsSet,
      userId,
      wordsSetId,
    });
    // DEBUG: Delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return removedWordsSet;
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
