'use server';

import { prisma } from '@/lib/db';
import { TLanguageId } from '@/features/languages/types';
import { TUserId } from '@/shared/types/TUser';

import { convertLanguagesToClientForm } from '../helpers';

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
        languages: true,
      },
      data: {
        // @see:
        // - https://www.prisma.io/docs/orm/reference/prisma-client-reference#delete-1
        languages: {
          delete: {
            id: languageId,
          },
        },
      },
    });
    const updatedLanguages = updateResult.languages;
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
    return convertLanguagesToClientForm(updatedLanguages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteLanguage] Error updating language', {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error
    throw error;
  }
}
