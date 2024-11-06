'use server';

import { prisma } from '@/lib/db';
import { TPrismaLanguage } from '@/features/languages/types';
import { ServerError } from '@/shared/types/ServerError';
import { TUserId } from '@/shared/types/TUser';

import { convertPrismaLanguagesToClient } from '../helpers';

export type TFetchLanguagesAction = typeof fetchLanguages;

export async function fetchLanguages(userId: TUserId) {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      // name: true,
      // emailVerified: true,
      languages: true,
    },
  });
  if (!result) {
    throw new ServerError(`No data returned for the user id "${userId}"`);
  }
  const languages = result.languages as TPrismaLanguage[];
  /* console.log('[LanguagesPage:fetchLanguages] result', {
   *   languages,
   *   result,
   *   userId,
   * });
   */
  /* // DEBUG: Delay
   * await new Promise((resolve) => setTimeout(resolve, 3000));
   */
  return convertPrismaLanguagesToClient(languages);
}
