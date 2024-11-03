'use server';

import { prisma } from '@/lib/db';
import { TUserId } from '@/shared/types/TUser';

import { TLanguageId } from '../types';
import { convertPrismaLanguagesToClient } from '../helpers';

export type TDeleteLanguageAction = typeof deleteLanguage;

export async function deleteLanguage(userId: TUserId, languageId: TLanguageId) {
  try {
    const prismaUser = prisma.user;
    /* console.log('[deleteLanguage] start', {
     *   userId,
     *   languageId,
     *   prismaUser,
     *   prisma,
     * });
     */
    const updateResult = await prismaUser.update({
      where: {
        id: userId,
      },
      include: {
        usedLanguages: true,
      },
      data: {
        // @see:
        // - https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-1
        usedLanguages: {
          delete: {
            id: languageId,
          },
        },
      },
    });
    const updatedLanguages = updateResult.usedLanguages;
    /* console.log('[deleteLanguage] done', {
     *   updatedLanguages,
     *   updateResult,
     *   userId,
     *   languageId,
     * });
     */
    /* // DEBUG: Delay
     * await new Promise((resolve) => setTimeout(resolve, 5000));
     */
    return convertPrismaLanguagesToClient(updatedLanguages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteLanguage] Error updating usedLanguage', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw error;
  }
}
