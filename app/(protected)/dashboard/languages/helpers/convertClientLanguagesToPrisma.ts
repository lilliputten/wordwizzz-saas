import { TUserId } from '@/shared/types/TUser';

import { TLanguage } from '../types/TLanguage';
import { TPrismaLanguage } from '../types/TPrismaLanguage';

export function convertClientLanguagesToPrisma(
  userId: TUserId,
  clientLanguages: TLanguage[],
): TPrismaLanguage[] {
  return clientLanguages.map(({ id, name }) => ({ id, name, userId }) as TPrismaLanguage);
}
