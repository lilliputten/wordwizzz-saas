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
  const [isUpdating, setIsUpdating] = React.useState(false);
  const memo = React.useMemo<{ isUpdating?: boolean }>(() => ({}), []);

  // Effect: Update memo data
  React.useEffect(() => {
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
      setIsUpdating(true);
      return deleteLanguage(userId, languageId)
        .then((updatedLanguages) => {
          console.log('[LanguagesList:onDeleteLanguage] done', {
            updatedLanguages,
            userId,
            languageId,
          });
          setLanguages(updatedLanguages);
          /* setLanguages((languages) => {
           *   return languages.filter((lang) => lang.id !== languageId);
           * });
           */
          toast.success('Language has been added');
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
        })
        .finally(() => {
          setIsUpdating(false);
        });
    },
    [memo, userId, deleteLanguage],
  );

  const onAddLanguage = React.useCallback(
    (language: TLanguage) => {
      const { isUpdating } = memo;
      console.log('[LanguagesList:onAddLanguage] begin', {
        isUpdating,
        userId,
        language,
      });
      if (isUpdating) {
        throw new Error('The data is currently being updated');
      }
      setIsUpdating(true);
      return addLanguage(userId, language)
        .then((updatedLanguages) => {
          console.log('[LanguagesList:onAddLanguage] done', {
            updatedLanguages,
            userId,
            language,
          });
          setLanguages(updatedLanguages);
          /* setLanguages((languages) => {
           *   return languages.concat(language);
           * });
           */
          toast.success('Language has been added');
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
        })
        .finally(() => {
          // setIsUpdating(false);
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
