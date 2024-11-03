import { TLanguage } from '../types/TLanguage';
import { TPrismaLanguage } from '../types/TPrismaLanguage';

export function convertPrismaLanguageToClient(prismaLanguage: TPrismaLanguage) {
  const { id, name } = prismaLanguage;
  return { id, name } as TLanguage;
}

export function convertPrismaLanguagesToClient(prismaLanguages: TPrismaLanguage[]) {
  return prismaLanguages.map((language) => convertPrismaLanguageToClient(language));
}
