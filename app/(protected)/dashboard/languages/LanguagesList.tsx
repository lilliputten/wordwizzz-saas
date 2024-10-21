'use client';

import React from 'react';

import { constructMetadata } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { EmptyPlaceholder } from '@/components/shared/empty-placeholder';
import { siteConfig } from '@/config/site';

import { TLanguage, TLanguageId } from './types/TLanguage';
import { LanguagesListTable } from './LanguagesListTable';
import { AddLanguageBlock } from './AddLanguageBlock';

// import { useAddLanguageModal } from './AddLanguageModal';

export const metadata = constructMetadata({
  title: 'Languages - ' + siteConfig.name,
  description: 'Check and manage your latest languages.',
});

const sampleLanguages: TLanguage[] = [
  { id: 'en', name: 'English' },
  { id: 'cn', name: 'Chinese' },
];

function NoLanguages() {
  return (
    <>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="package" />
        <EmptyPlaceholder.Title>No languages</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You dont have any languages yet. Add any language to yur profile.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </>
  );
}

export function LanguagesList() {
  const [languages, setLanguages] = React.useState(sampleLanguages);
  const handleDeleteLanguage = React.useCallback((id: TLanguageId) => {
    setLanguages((languages) => {
      return languages.filter((lang) => lang.id !== id);
    });
    // TODO: Update in store / on server...
  }, []);
  const handleAddLanguage = React.useCallback((language: TLanguage) => {
    debugger;
    setLanguages((languages) => {
      return languages.concat(language);
    });
    // TODO: Update in store / on server...
  }, []);
  const hasLanguages = !!languages.length;
  // const { setShowAddLanguageModal, AddLanguageModal } = useAddLanguageModal();
  if (!hasLanguages) {
    return <NoLanguages />;
  }
  return (
    <>
      <LanguagesListTable languages={languages} onDeleteLanguage={handleDeleteLanguage} />
      <AddLanguageBlock languages={languages} onAddLanguage={handleAddLanguage} />
      {/*
      <AddLanguageModal />
      */}
      {/*
      <Button
        //
        onClick={() => setShowAddLanguageModal(true)}
      >
        Add language
      </Button>
      */}
    </>
  );
}
