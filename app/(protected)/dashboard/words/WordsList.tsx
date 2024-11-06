'use client';

import React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
// import { WaitingSplash } from '@/components/ui/WaitingSplash';
import { WaitingWrapper } from '@/components/ui/WaitingWrapper';
import { TLanguage } from '@/features/languages/types';
import { TWord, TWordId } from '@/features/words/types';
import { getErrorText } from '@/shared/helpers/strings';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';
import { TUserId } from '@/shared/types/TUser';

// import { TAddWordAction, TDeleteWordAction } from './actions';
import { useAddWordModal } from './AddWord';
import { WordsEmpty } from './WordsEmpty';
import { WordsListTable } from './WordsListTable';
import { WordsSkeleton } from './WordsSkeleton';

interface TWordsListProps {
  userId: TUserId;
  languages: TLanguage[];
  initialWords: TWord[];
  // addWord: TAddWordAction;
  // deleteWord: TDeleteWordAction;
}

export function WordsList(props: TWordsListProps) {
  const {
    // prettier-ignore
    userId,
    languages,
    initialWords,
    // addWord,
    // deleteWord,
  } = props;
  const { showAddWordModal, AddWordModal } = useAddWordModal();
  const [words, setWords] = React.useState(initialWords);
  const [isUpdating, startUpdating] = React.useTransition();
  // const isUpdating = true; // DEBUG

  const memo = React.useMemo<{ isUpdating?: boolean }>(() => ({}), []);

  // Effect: Update memo data
  React.useEffect(() => {
    memo.isUpdating = isUpdating;
  }, [memo, isUpdating]);

  /* // TODO: Handlers...
  const onDeleteWord = React.useCallback(
    (wordId: TWordId) => {
      const { isUpdating } = memo;
      if (isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TWord[]>((resolve, reject) => {
        startUpdating(() => {
          return deleteWord(userId, wordId)
            .then((updatedWords) => {
              setWords(updatedWords);
              // setWords((words) => words.filter((lang) => lang.id !== wordId)); // XXX: Manually apply changes
              toast.success('The word has been removed');
              resolve(updatedWords);
            })
            .catch((error) => {
              const description = getErrorText(error);
              // eslint-disable-next-line no-console
              console.error('[WordsList:onDeleteWord]', description, {
                error,
              });
              debugger; // eslint-disable-line no-debugger
              toast.error('Error adding word', {
                description,
              });
              // Re-throw?
              reject(error);
            });
        });
      });
    },
    [memo, userId, deleteWord],
  );
  */

  const onAddWord = React.useCallback(
    (word: TWord) => {
      if (memo.isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TWord[]>((resolve, reject) => {
        startUpdating(() => {
          console.log('[WordsList:onAddWord]', {
            word,
            words,
          });
          debugger;
          // return addWord(userId, word)
          return Promise.resolve([...words, word])
            .then((updatedWords) => {
              setWords(updatedWords);
              // setWords((words) => words.concat(word)); // XXX: Manually apply changes
              toast.success('The word has been added');
              resolve(updatedWords);
            })
            .catch((error) => {
              const description = getErrorText(error);
              // eslint-disable-next-line no-console
              console.error('[WordsList:onAddWord]', description, {
                error,
              });
              debugger; // eslint-disable-line no-debugger
              toast.error('Error adding word', {
                description,
              });
              // Re-throw?
              reject(error);
            });
        });
      });
    },
    [
      memo,
      userId,
      // addWord,
      // DEBUG
      words, // DEBUG: Only for demo purpose: to update current words list in-place
    ],
  );

  const hasWords = !!words.length;

  /* // DEBUG: Show skeleton
   * const showSkeleton = true;
   * if (showSkeleton) {
   *   return <WordsSkeleton className={cn('__WordsList_Skeleton')} />;
   * }
   */

  return (
    <div
      className={cn(
        '__WordsList',
        'relative',
        'transition-opacity',
        'flex-1',
        tailwindClippingLayout({ vertical: true }),
      )}
    >
      {hasWords ? (
        <>
          <WordsListTable
            className={cn('__WordsList_Table flex-1', tailwindClippingLayout({ vertical: true }))}
            words={words}
            // onDeleteWord={onDeleteWord}
            showAddWordModal={showAddWordModal}
          />
        </>
      ) : (
        <WordsEmpty className="flex-1" showAddWordModal={showAddWordModal} />
      )}
      <WaitingWrapper show={isUpdating}>
        <WordsSkeleton />
      </WaitingWrapper>
      <AddWordModal
        // prettier-ignore
        words={words}
        onAddWord={onAddWord}
      />
    </div>
  );
}
