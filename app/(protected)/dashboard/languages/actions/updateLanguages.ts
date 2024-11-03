'use server';

import { prisma } from '@/lib/db';
import { TUserId } from '@/shared/types/TUser';

import { TPrismaLanguage } from '../types/TPrismaLanguage';
import { TLanguage } from '../types/TLanguage';
import { convertClientLanguagesToPrisma } from '../helpers/convertClientLanguagesToPrisma';

export async function updateLanguages(userId: TUserId, languages: TLanguage[]) {
  try {
    const prismaLanguages: TPrismaLanguage[] = convertClientLanguagesToPrisma(userId, languages);
    const prismaUser = prisma.user;
    console.log('[updateLanguages]', {
      userId,
      prismaLanguages,
      languages,
      prismaUser,
      prisma,
    });
    debugger;
    const result = await prismaUser.update({
      where: {
        id: userId,
      },
      data: {
        // @see https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
        // @see https://www.prisma.io/docs/orm/prisma-client/queries
        usedLanguages: {
          // XXX: Stuck here on 2024.11.03, 07:57
          set: prismaLanguages,
        },
        stripeCustomerId: userId,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // TODO: Save?
    // DEBUG
    const test = await prismaUser.findUnique({
      where: {
        id: userId,
      },
      select: {
        usedLanguages: true,
      },
    });
    console.log('[updateLanguages] done', {
      test,
      result,
    });
    debugger;
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
