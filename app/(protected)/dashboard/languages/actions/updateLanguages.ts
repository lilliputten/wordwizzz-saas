'use server';

import { prisma } from '@/lib/db';
import { TUserId } from '@/shared/types/TUser';

import { TPrismaLanguage } from '../types/TPrismaLanguage';
import { TLanguage } from '../types/TLanguage';
import { convertClientLanguagesToPrisma } from '../helpers/convertClientLanguagesToPrisma';

export async function updateLanguages(userId: TUserId, languages: TLanguage[]) {
  try {
    const prismaLanguages: TPrismaLanguage[] = convertClientLanguagesToPrisma(userId, languages);
    console.log('[updateLanguages]', {
      userId,
      prismaLanguages,
      languages,
    });
    // debugger;
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        // @see https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
        usedLanguages: {
          set: prismaLanguages,
        },
      },
    });
    console.log('[updateLanguages] done', {
      result,
    });
    // debugger;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateLanguages] Error updating usedLanguages', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // DEBUG: Re-throw an error
    throw error;
  }
}
