import { TLanguage } from '@/features/languages/types';

function convertPrismaLanguageToClient(prismaLanguage: TLanguage) {
  const { id, name } = prismaLanguage;
  return { id, name } as TLanguage;
}

export function convertLanguagesToClientForm(prismaLanguages: TLanguage[]) {
  return prismaLanguages.map((language) => convertPrismaLanguageToClient(language));
}
