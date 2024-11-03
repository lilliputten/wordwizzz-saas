import { TLanguage } from '../types/TLanguage';
import { TPrismaLanguage } from '../types/TPrismaLanguage';

export function convertPrismaLanguagesToClient(prismaLanguages: TPrismaLanguage[]) {
  return prismaLanguages.map(({ id, name }) => ({ id, name }) as TLanguage);
}
