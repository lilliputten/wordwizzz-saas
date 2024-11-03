'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { constructMetadata } from '@/lib/utils';
import { siteConfig } from '@/config/site';

import { TLanguage, TLanguageId } from './types/TLanguage';
import { LanguagesListTable } from './LanguagesListTable';
import { AddLanguageBlock } from './AddLanguageBlock';
import { TUserId } from '@/shared/types/TUser';
import { WaitingSplash } from '@/components/ui/WaitingSplash';
import { NoLanguages } from './NoLanguages';
import { toast } from 'sonner';
import { getErrorText } from '@/shared/helpers/strings';

export const metadata = constructMetadata({
  title: 'Languages - ' + siteConfig.name,
  description: 'Check and manage your latest languages.',
});

interface TLanguagesListProps {
  userId: TUserId;
  initialLanguages: TLanguage[];
  updateLanguages: (userId: TUserId, languages: TLanguage[]) => Promise<void>;
}

export async function LanguagesList(props: TLanguagesListProps) {
  const {
    // prettier-ignore
    userId,
    initialLanguages,
    updateLanguages,
  } = props;
  const [languages, setLanguages] = React.useState(initialLanguages);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const notInitial = languages !== initialLanguages;
  // Effect: Languages updated
  React.useEffect(() => {
    if (notInitial) {
      console.log('[LanguagesList:Effect: Languages updated]', {
        notInitial,
        userId,
        languages,
      });
      // debugger;
      // TODO: Deep compare or use a `actuallyUpdated` flag?
      setIsUpdating(true);
      updateLanguages(userId, languages)
        .catch((error) => {
          const description = getErrorText(error);
          // eslint-disable-next-line no-console
          console.error('[LanguagesList:Effect: Languages updated]', description, {
            error,
          });
          debugger; // eslint-disable-line no-debugger
          toast.error('Error updating languages.', {
            description,
          });
        })
        .finally(() => {
          setIsUpdating(false);
        });
    }
  }, [userId, notInitial, updateLanguages, languages]);
  const onDeleteLanguage = React.useCallback((id: TLanguageId) => {
    setLanguages((languages) => {
      return languages.filter((lang) => lang.id !== id);
    });
    // TODO: Update in store / on server...
  }, []);
  const onAddLanguage = React.useCallback((language: TLanguage) => {
    setLanguages((languages) => {
      return languages.concat(language);
    });
    // TODO: Update in store / on server...
    return Promise.resolve();
    /* // DEBUG: Demo error
     * return Promise.reject('Sample error');
     */
  }, []);
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
