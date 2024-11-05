'use client';

import React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
// import { WaitingSplash } from '@/components/ui/WaitingSplash';
import { WaitingWrapper } from '@/components/ui/WaitingWrapper';
import { TLanguage, TLanguageId } from '@/features/languages/types';
import { getErrorText } from '@/shared/helpers/strings';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';
import { TUserId } from '@/shared/types/TUser';

import { TAddLanguageAction, TDeleteLanguageAction } from './actions';
// import { AddLanguageBlock } from './AddLanguageBlock';
import { useAddLanguageModal } from './AddLanguageModal';
import { LanguagesListTable } from './LanguagesListTable';
import { LanguagesSkeleton } from './LanguagesSkeleton';
import { NoLanguages } from './NoLanguages';

interface TLanguagesListProps {
  userId: TUserId;
  initialLanguages: TLanguage[];
  addLanguage: TAddLanguageAction;
  deleteLanguage: TDeleteLanguageAction;
}

export function LanguagesList(props: TLanguagesListProps) {
  const {
    // prettier-ignore
    userId,
    initialLanguages,
    addLanguage,
    deleteLanguage,
  } = props;
  const { showAddLanguageModal, AddLanguageModal } = useAddLanguageModal();
  // NOTE: Use `isoLanguages` as an initial data to test the clipping and scrollable layouts
  const [languages, setLanguages] = React.useState(initialLanguages);
  const [isUpdating, startUpdating] = React.useTransition();
  // const isUpdating = true; // DEBUG

  const memo = React.useMemo<{ isUpdating?: boolean }>(() => ({}), []);

  // Effect: Update memo data
  React.useEffect(() => {
    memo.isUpdating = isUpdating;
  }, [memo, isUpdating]);

  const onDeleteLanguage = React.useCallback(
    (languageId: TLanguageId) => {
      const { isUpdating } = memo;
      if (isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TLanguage[]>((resolve, reject) => {
        startUpdating(() => {
          return deleteLanguage(userId, languageId)
            .then((updatedLanguages) => {
              setLanguages(updatedLanguages);
              // setLanguages((languages) => languages.filter((lang) => lang.id !== languageId)); // XXX: Manually apply changes
              toast.success('The language has been removed');
              resolve(updatedLanguages);
            })
            .catch((error) => {
              const description = getErrorText(error);
              // eslint-disable-next-line no-console
              console.error('[LanguagesList:onDeleteLanguage]', description, {
                error,
              });
              debugger; // eslint-disable-line no-debugger
              toast.error('Error adding language', {
                description,
              });
              // Re-throw?
              reject(error);
            });
        });
      });
    },
    [memo, userId, deleteLanguage],
  );

  const onAddLanguage = React.useCallback(
    (language: TLanguage) => {
      if (memo.isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TLanguage[]>((resolve, reject) => {
        startUpdating(() => {
          return addLanguage(userId, language)
            .then((updatedLanguages) => {
              setLanguages(updatedLanguages);
              // setLanguages((languages) => languages.concat(language)); // XXX: Manually apply changes
              toast.success('The language has been added');
              resolve(updatedLanguages);
            })
            .catch((error) => {
              const description = getErrorText(error);
              // eslint-disable-next-line no-console
              console.error('[LanguagesList:onAddLanguage]', description, {
                error,
              });
              debugger; // eslint-disable-line no-debugger
              toast.error('Error adding language', {
                description,
              });
              // Re-throw?
              reject(error);
            });
        });
      });
    },
    [memo, userId, addLanguage],
  );

  const hasLanguages = !!languages.length;

  /* // DEBUG: Show skeleton
   * const showSkeleton = true;
   * if (showSkeleton) {
   *   return <LanguagesSkeleton className={cn('__LanguagesList_Skeleton')} />;
   * }
   */

  return (
    <div
      className={cn(
        '__LanguagesList',
        'relative',
        'transition-opacity',
        'flex-1',
        tailwindClippingLayout({ vertical: true }),
      )}
    >
      {hasLanguages ? (
        <LanguagesListTable
          className={cn('__LanguagesList_Table flex-1', tailwindClippingLayout({ vertical: true }))}
          languages={languages}
          onDeleteLanguage={onDeleteLanguage}
          showAddLanguageModal={showAddLanguageModal}
        />
      ) : (
        <NoLanguages className="flex-1" showAddLanguageModal={showAddLanguageModal} />
      )}
      {/* // UNUSED: Inline add language block under the table
      <AddLanguageBlock
        languages={languages}
        onAddLanguage={onAddLanguage}
        className="min-h-[300px]"
      />
      */}
      {/* // UNUSED: Show waiting spinner overlay instead skeleton? (Mind the bug with skeleton flash at the beginning of prisma data update.)
      <WaitingSplash show={isUpdating} />
      */}
      <WaitingWrapper show={isUpdating}>
        <LanguagesSkeleton />
      </WaitingWrapper>
      <AddLanguageModal
        // prettier-ignore
        languages={languages}
        onAddLanguage={onAddLanguage}
      />
    </div>
  );
}
