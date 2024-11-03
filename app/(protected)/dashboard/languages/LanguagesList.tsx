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

  const memo = React.useMemo<{ isUpdating?: boolean }>(() => ({}), []);

  // Effect: Update memo data
  React.useEffect(() => {
    console.log('[LanguagesList:Effect: Update memo data]', {
      isUpdating,
    });
    memo.isUpdating = isUpdating;
  }, [memo, isUpdating]);

  const onDeleteLanguage = React.useCallback(
    (languageId: TLanguageId) => {
      // TODO: Update in store / on server...
      const { isUpdating } = memo;
      console.log('[LanguagesList:onDeleteLanguage] begin', {
        isUpdating,
        userId,
        languageId,
      });
      if (isUpdating) {
        throw new Error('The data is currently being updated');
      }
      return new Promise<TLanguage[]>((resolve, reject) => {
        startUpdating(async () => {
          return deleteLanguage(userId, languageId)
            .then((updatedLanguages) => {
              console.log('[LanguagesList:onDeleteLanguage] done', {
                updatedLanguages,
                userId,
                languageId,
              });
              setLanguages(updatedLanguages);
              // setLanguages((languages) => languages.filter((lang) => lang.id !== languageId)); // Manually apply changes
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
      console.log('[LanguagesList:onAddLanguage] begin', {
        userId,
        language,
      });
      return new Promise<TLanguage[]>((resolve, reject) => {
        startUpdating(async () => {
          return addLanguage(userId, language)
            .then((updatedLanguages) => {
              console.log('[LanguagesList:onAddLanguage] done', {
                updatedLanguages,
                userId,
                language,
              });
              setLanguages(updatedLanguages);
              // setLanguages((languages) => languages.concat(language)); // Manually apply changes
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

  return (
    <div
      className={cn(
        '__LanguagesList',
        'relative',
        'transition-opacity',
        // isUpdating && ['opacity-50', 'pointer-events-none'].join(' '),
      )}
    >
      {hasLanguages ? (
        <LanguagesListTable languages={languages} onDeleteLanguage={onDeleteLanguage} />
      ) : (
        <NoLanguages />
      )}
      <AddLanguageBlock languages={languages} onAddLanguage={onAddLanguage} />
      <WaitingSplash show={isUpdating} />
    </div>
  );
}
