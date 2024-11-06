'use client';

import React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
// import { WaitingSplash } from '@/components/ui/WaitingSplash';
import { WaitingWrapper } from '@/components/ui/WaitingWrapper';
import { TLanguage } from '@/features/languages/types';
import {
  deleteWordsSet,
  TAddWordsSetAction,
  TDeleteWordsSetAction,
} from '@/features/wordsSets/actions';
import { convertWordsSetsToClientForm } from '@/features/wordsSets/helpers';
import { TWordsSet, TWordsSetId } from '@/features/wordsSets/types';
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
  initialWordsSets: TWordsSet[];
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
    // deleteWordsSet,
  } = props;
  const { showAddWordsSetModal, AddWordsSetModal } = useAddWordsSetModal();
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
      return new Promise<TWordsSet[]>((resolve, reject) => {
        startUpdating(() => {
          return deleteWordsSet(userId, wordSetId)
            .then((updateResult) => {
              const { wordsSets } = updateResult;
              const clientWordsSets = convertWordsSetsToClientForm(wordsSets);
              console.log('[WordsSetsList:onDeleteWordsSet] done', {
                updateResult,
                wordsSets,
                clientWordsSets,
              });
              debugger;
              setWordsSets(clientWordsSets);
              toast.success('The words set has been removed');
              resolve(clientWordsSets);
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
    (wordsSet: TWordsSet) => {
      if (memo.isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TWordsSet[]>((resolve, reject) => {
        startUpdating(() => {
          console.log('[WordsSetsList:onAddWordsSet]', {
            wordsSet,
            wordsSets,
          });
          return addWordsSet(userId, wordsSet)
            .then((updateResult) => {
              /* // Sample updateResult data:
               * createdAt: Wed Nov 06 2024 14:42:07 GMT+0300 (Moscow Standard Time) {}
               * email: "lilliputten@gmail.com"
               * emailVerified: null
               * id: "cm35t72yj000093uu5ag6m97d"
               * image: "https://lh3.googleusercontent.com/a/ACg8ocJJYaKIduKmECJkLVdTs_RFDtv9YoSzbIPJxkhldzgdBlL_CZkh=s96-c"
               * languages: (2) [{…}, {…}]
               * name: "Igor Lilliputten"
               * role: "USER"
               * stripeCurrentPeriodEnd: null
               * stripeCustomerId: null
               * stripePriceId: null
               * stripeSubscriptionId: null
               * updatedAt: Wed Nov 06 2024 14:42:07 GMT+0300 (Moscow Standard Time) {}
               * words: []
               * wordsSets: [{…}]
               */
              const { wordsSets: updatedWordsSets } = updateResult;
              const clientWordsSets = updatedWordsSets.map(
                ({ id, name }) => ({ id, name }) as TWordsSet,
              );
              console.log('[WordsSetsList:onAddWordsSet] done', {
                clientWordsSets,
                updatedWordsSets,
                updateResult,
                wordsSet,
                wordsSets,
              });
              debugger;
              setWordsSets(clientWordsSets);
              // setWordsSets((wordsSets) => wordsSets.concat(wordsSet)); // XXX: Manually apply changes
              toast.success('The wordsSet has been added');
              resolve(clientWordsSets);
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
    [
      memo,
      userId,
      addWordsSet,
      // DEBUG
      wordsSets, // DEBUG: Only for demo purpose: to update current wordsSets list in-place
    ],
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
      <AddWordsSetModal
        // prettier-ignore
        languages={languages}
        wordsSets={wordsSets}
        onAddWordsSet={onAddWordsSet}
      />
    </div>
  );
}
