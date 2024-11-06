import { TLanguage, TPrismaLanguage } from '@/features/languages/types';

function convertPrismaLanguageToClient(prismaLanguage: TPrismaLanguage) {
  const { id, name } = prismaLanguage;
  return { id, name } as TLanguage;
}

export function convertLanguagesToClientForm(prismaLanguages: TPrismaLanguage[]) {
  return prismaLanguages.map((language) => convertPrismaLanguageToClient(language));
}
