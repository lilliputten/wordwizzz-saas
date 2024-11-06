'use server';

import { prisma } from '@/lib/db';
import { TLanguage } from '@/features/languages/types';
import { TUserId } from '@/shared/types/TUser';

import { convertLanguagesToClientForm } from '../helpers';

export type TAddLanguageAction = typeof addLanguage;

// @see:
// - https://www.prisma.io/docs/orm/reference/prisma-client-reference#upsert-1
// - https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
// - https://www.prisma.io/docs/orm/prisma-client/queries
// - https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function addLanguage(userId: TUserId, language: TLanguage) {
  try {
    const prismaUser = prisma.user;
    /* console.log('[addLanguage] start', {
     *   userId,
     *   language,
     *   prismaUser,
     *   prisma,
     * });
     */
    const updateResult = await prismaUser.update({
      where: {
        id: userId,
      },
      include: {
        languages: true,
      },
      data: {
        languages: {
          upsert: {
            where: { id: userId },
            create: language,
            update: language,
          },
        },
      },
    });
    const updatedLanguages = updateResult.languages;
    /* console.log('[addLanguage] done', {
     *   updatedLanguages,
     *   updateResult,
     *   userId,
     *   language,
     * });
     */
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 5000));
     */
    return convertLanguagesToClientForm(updatedLanguages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[addLanguage] Error updating language', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw error;
  }
}
