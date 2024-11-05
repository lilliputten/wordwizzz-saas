import { LanguagesHeader } from './LanguagesHeader';
import { LanguagesSkeleton } from './LanguagesSkeleton';

export function LanguagesLoading() {
  return (
    <>
      <LanguagesHeader />
      <LanguagesSkeleton />
    </>
  );
}
