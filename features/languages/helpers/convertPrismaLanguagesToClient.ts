import { TLanguage, TPrismaLanguage } from '@/features/languages/types';

export function convertPrismaLanguageToClient(prismaLanguage: TPrismaLanguage) {
  const { id, name } = prismaLanguage;
  return { id, name } as TLanguage;
}

export function convertPrismaLanguagesToClient(prismaLanguages: TPrismaLanguage[]) {
  return prismaLanguages.map((language) => convertPrismaLanguageToClient(language));
}
