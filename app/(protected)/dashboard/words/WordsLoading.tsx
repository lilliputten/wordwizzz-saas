import { WordsHeader } from './WordsHeader';
import { WordsSkeleton } from './WordsSkeleton';

export function WordsLoading() {
  return (
    <>
      <WordsHeader />
      <WordsSkeleton />
    </>
  );
}
