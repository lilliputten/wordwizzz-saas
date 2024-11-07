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
    // const prismaWordsSet = prisma.wordsSet;
    // const prismaUser = prisma.user;
    // const prismaLanguage = prisma.language;
    // DEBUG: Fetch current user with related data
    const foundLanguages = await prisma.language.findMany({
      where: {
        id: { in: languageIds },
      },
    });
    if (!foundLanguages.length) {
      throw new DatabaseError(`Can't find languages for id(s): "${languageIds}"`);
    }
    const connectLanguagesRecord = {
      connect: foundLanguages,
    };
    const wordsSetRecord = {
      name,
      languages: connectLanguagesRecord,
    };
    console.log('[addWordsSet] start', {
      wordsSetRecord,
      foundLanguages,
      name,
      userId,
      languageIds, // TODO!
      wordsSet,
      prisma,
    });
    // TODO: Connect wordsSet with languages from `languageIds`
    const addedWordsSet = await prisma.wordsSet.create({
      data: {
        userId: userId,
        name,
        languages: connectLanguagesRecord,
      },
      select: {
        id: true,
        name: true,
        languages: true,
        // words: true,
      },
    });
    /*
    const updateResultOld = await prisma.user.update({
      where: {
        id: userId,
      },
      include: {
        wordsSets: true,
        languages: true,
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
    */
    console.log('[addWordsSet] done', {
      addedWordsSet,
      userId,
      wordsSet,
    });
    // DEBUG: Delay
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return addedWordsSet;
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
