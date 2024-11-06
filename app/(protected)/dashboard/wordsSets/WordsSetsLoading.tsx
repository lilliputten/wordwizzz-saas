import { WordsSetsHeader } from './WordsSetsHeader';
import { WordsSetsSkeleton } from './WordsSetsSkeleton';

export function WordsSetsLoading() {
  return (
    <>
      <WordsSetsHeader />
      <WordsSetsSkeleton />
    </>
  );
}
