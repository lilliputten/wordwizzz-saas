'use server';

import { prisma } from '@/lib/db';
import { TUserId } from '@/shared/types/TUser';

import { TPrismaLanguage } from '../types';
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
      usedLanguages: true,
    },
  });
  if (!result) {
    throw new Error(`No data returned for the user id "${userId}"`);
  }
  const usedLanguages = result.usedLanguages as TPrismaLanguage[];
  console.log('[LanguagesPage:fetchLanguages] result', {
    usedLanguages,
    result,
    userId,
  });
  // DEBUG: Delay
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return convertPrismaLanguagesToClient(usedLanguages);
}
