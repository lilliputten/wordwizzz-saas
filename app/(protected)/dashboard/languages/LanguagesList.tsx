'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { getErrorText } from '@/shared/helpers/strings';
import { TUserId } from '@/shared/types/TUser';
import { WaitingSplash } from '@/components/ui/WaitingSplash';

import { TLanguage, TLanguageId } from './types';
import { LanguagesListTable } from './LanguagesListTable';
import { AddLanguageBlock } from './AddLanguageBlock';
import { NoLanguages } from './NoLanguages';
import { toast } from 'sonner';
import { TAddLanguageAction, TDeleteLanguageAction } from './actions';
import { LanguagesSkeleton } from './LanguagesSkeleton';
import { WaitingWrapper } from '@/components/ui/WaitingWrapper';

interface TLanguagesListProps {
  userId: TUserId;
  initialLanguages: TLanguage[];
  addLanguage: TAddLanguageAction;
  deleteLanguage: TDeleteLanguageAction;
}

export async function LanguagesList(props: TLanguagesListProps) {
  const {
    // prettier-ignore
    userId,
    initialLanguages,
    addLanguage,
    deleteLanguage,
  } = props;
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
        'flex',
        'flex-col',
      )}
    >
      {hasLanguages ? (
        <LanguagesListTable
          className="flex-1"
          languages={languages}
          onDeleteLanguage={onDeleteLanguage}
        />
      ) : (
        <NoLanguages className="flex-1" />
      )}
      <AddLanguageBlock
        languages={languages}
        onAddLanguage={onAddLanguage}
        className="min-h-[300px]"
      />
      {/* // XXX: Show waiting spinner overlay instead skeleton?
      <WaitingSplash show={isUpdating} />
      */}
      <WaitingWrapper show={isUpdating}>
        <LanguagesSkeleton />
      </WaitingWrapper>
    </div>
  );
}
