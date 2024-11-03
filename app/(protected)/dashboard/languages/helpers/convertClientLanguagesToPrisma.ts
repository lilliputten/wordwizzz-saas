import { TUserId } from '@/shared/types/TUser';

import { TLanguage } from '../types/TLanguage';
import { TPrismaLanguage } from '../types/TPrismaLanguage';

export function convertClientLanguageToPrisma(
  userId: TUserId,
  clientLanguage: TLanguage,
): TPrismaLanguage {
  return { ...clientLanguage, userId } as TPrismaLanguage;
}

export function convertClientLanguagesToPrisma(
  userId: TUserId,
  clientLanguages: TLanguage[],
): TPrismaLanguage[] {
  return clientLanguages.map((language) => convertClientLanguageToPrisma(userId, language));
}
