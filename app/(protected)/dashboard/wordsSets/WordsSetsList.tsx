'use client';

import React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
// import { WaitingSplash } from '@/components/ui/WaitingSplash';
import { WaitingWrapper } from '@/components/ui/WaitingWrapper';
import { TLanguage, TLanguageId } from '@/features/languages/types';
import { TAddWordsSetAction, TDeleteWordsSetAction } from '@/features/wordsSets/actions';
import { convertWordsSetsToClientForm } from '@/features/wordsSets/helpers';
import {
  TNewWordsSet,
  TWordsSet,
  TWordsSetId,
  TWordsSetWithLanguages,
} from '@/features/wordsSets/types';
import { getErrorText } from '@/shared/helpers/strings';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';
import { TUserId } from '@/shared/types/TUser';

import { useAddWordsSetModal } from './AddWordsSet';
import { WordsSetsEmpty } from './WordsSetsEmpty';
import { WordsSetsListTable } from './WordsSetsListTable';
import { WordsSetsSkeleton } from './WordsSetsSkeleton';

interface TWordsSetsListProps {
  userId: TUserId;
  languages: TLanguage[];
  initialWordsSets: TWordsSetWithLanguages[];
  addWordsSet: TAddWordsSetAction;
  deleteWordsSet: TDeleteWordsSetAction;
}

export function WordsSetsList(props: TWordsSetsListProps) {
  const {
    // prettier-ignore
    userId,
    languages,
    initialWordsSets,
    addWordsSet,
    deleteWordsSet,
  } = props;
  const { showAddWordsSetModal, AddWordsSetModalWrapper } = useAddWordsSetModal();
  const [wordsSets, setWordsSets] = React.useState(initialWordsSets);
  const [isUpdating, startUpdating] = React.useTransition();
  // const isUpdating = true; // DEBUG

  const memo = React.useMemo<{ isUpdating?: boolean }>(() => ({}), []);

  // Effect: Update memo data
  React.useEffect(() => {
    memo.isUpdating = isUpdating;
  }, [memo, isUpdating]);

  const onDeleteWordsSet = React.useCallback(
    (wordSetId: TWordsSetId) => {
      const { isUpdating } = memo;
      if (isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TWordsSetWithLanguages>((resolve, reject) => {
        startUpdating(() => {
          return deleteWordsSet(userId, wordSetId)
            .then((removedWordsSet) => {
              console.log('[WordsSetsList:onDeleteWordsSet] done', {
                removedWordsSet,
              });
              setWordsSets((wordsSets) => wordsSets.filter(({ id }) => id !== removedWordsSet.id));
              toast.success('The words set has been removed');
              resolve(removedWordsSet);
            })
            .catch((error) => {
              const description = getErrorText(error);
              // eslint-disable-next-line no-console
              console.error('[WordsSetsList:onDeleteWordsSet]', description, {
                error,
              });
              debugger; // eslint-disable-line no-debugger
              toast.error('Error adding wordsSet', {
                description,
              });
              // Re-throw?
              reject(error);
            });
        });
      });
    },
    [memo, userId, deleteWordsSet],
  );

  const onAddWordsSet = React.useCallback(
    (wordsSet: TNewWordsSet, languageIds: TLanguageId[]) => {
      if (memo.isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TWordsSetWithLanguages>((resolve, reject) => {
        startUpdating(() => {
          console.log('[WordsSetsList:onAddWordsSet]', {
            wordsSet,
            // wordsSets,
          });
          return addWordsSet(userId, wordsSet, languageIds)
            .then((addedWordsSet) => {
              console.log('[WordsSetsList:onAddWordsSet] done', {
                addedWordsSet,
                wordsSet,
              });
              setWordsSets((wordsSets) => wordsSets.concat(addedWordsSet));
              toast.success('The wordsSet has been added');
              resolve(addedWordsSet);
            })
            .catch((error) => {
              const description = getErrorText(error);
              // eslint-disable-next-line no-console
              console.error('[WordsSetsList:onAddWordsSet]', description, {
                error,
              });
              debugger; // eslint-disable-line no-debugger
              toast.error('Error adding wordsSet', {
                description,
              });
              // Re-throw?
              reject(error);
            });
        });
      });
    },
    [memo, userId, addWordsSet],
  );

  const hasWordsSets = !!wordsSets.length;

  /* // DEBUG: Show skeleton
   * const showSkeleton = true;
   * if (showSkeleton) {
   *   return <WordsSetsSkeleton className={cn('__WordsSetsList_Skeleton')} />;
   * }
   */

  return (
    <div
      className={cn(
        '__WordsSetsList',
        'relative',
        'transition-opacity',
        'flex-1',
        tailwindClippingLayout({ vertical: true }),
      )}
    >
      {hasWordsSets ? (
        <>
          <WordsSetsListTable
            className={cn(
              '__WordsSetsList_Table flex-1',
              tailwindClippingLayout({ vertical: true }),
            )}
            wordsSets={wordsSets}
            onDeleteWordsSet={onDeleteWordsSet}
            showAddWordsSetModal={showAddWordsSetModal}
          />
        </>
      ) : (
        <WordsSetsEmpty className="flex-1" showAddWordsSetModal={showAddWordsSetModal} />
      )}
      <WaitingWrapper show={isUpdating}>
        <WordsSetsSkeleton />
      </WaitingWrapper>
      <AddWordsSetModalWrapper
        // prettier-ignore
        languages={languages}
        wordsSets={wordsSets}
        onAddWordsSet={onAddWordsSet}
      />
    </div>
  );
}
