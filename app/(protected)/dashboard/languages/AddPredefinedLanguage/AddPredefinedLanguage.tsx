'use client';

import React from 'react';

import { TLanguage } from '../types/TLanguage';

interface TProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<void>;
}

export const AddPredefinedLanguage: React.FC<TProps> = (props) => {
  const { languages, onAddLanguage } = props;
  const [isPending, startTransition] = React.useTransition();

  const isSubmitEnabled = false; // !isPending && isDirty && isValid;

  // TODO: Call `onAddLanguage(language)` on finish, see `AddCustomLanguage` for example

  return (
    <>
      <div className="__AddPredefinedLanguage p-2 pt-4">
        <p className="Text">
          {/* Implement a selectable list (with a search?) here? */}
          TODO: Add a language from the list.
        </p>
      </div>
    </>
  );
};
