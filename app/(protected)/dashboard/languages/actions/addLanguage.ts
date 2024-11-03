'use server';

import { prisma } from '@/lib/db';
import { TUserId } from '@/shared/types/TUser';

import { TLanguage } from '../types';
import { convertPrismaLanguagesToClient } from '../helpers';

export type TAddLanguageAction = typeof addLanguage;

export async function addLanguage(userId: TUserId, language: TLanguage) {
  try {
    const prismaUser = prisma.user;
    console.log('[addLanguage] start', {
      userId,
      language,
      prismaUser,
      prisma,
    });
    const updateResult = await prismaUser.update({
      where: {
        id: userId,
      },
      include: {
        usedLanguages: true,
      },
      data: {
        // @see:
        // - https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-1
        // - https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
        // - https://www.prisma.io/docs/orm/prisma-client/queries
        // - https://www.prisma.io/docs/orm/prisma-client/queries/crud
        usedLanguages: {
          upsert: {
            where: { id: userId },
            create: language,
            update: language,
          },
        },
      },
    });
    const updatedLanguages = updateResult.usedLanguages;
    console.log('[addLanguage] done', {
      updatedLanguages,
      updateResult,
      userId,
      language,
    });
    // DEBUG: Delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return convertPrismaLanguagesToClient(updatedLanguages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[addLanguage] Error updating usedLanguage', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // DEBUG: Re-throw an error
    throw error;
  }
}
