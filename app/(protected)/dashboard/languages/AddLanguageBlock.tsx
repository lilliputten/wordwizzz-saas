'use client';

import React from 'react';

import { TLanguage } from './types/TLanguage';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { AddCustomLanguage } from './AddCustomLanguage';
import { AddPredefinedLanguage } from './AddPredefinedLanguage';

interface TProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<void>;
}

export const AddLanguageBlock: React.FC<TProps> = (props) => {
  const { languages, onAddLanguage } = props;
  return (
    <Tabs className="__AddLanguageBlock_Tabs" defaultValue="AddCustomLanguage">
      <TabsList>
        <TabsTrigger className="TabsTrigger" value="AddCustomLanguage">
          Add custom language
        </TabsTrigger>
        <TabsTrigger className="TabsTrigger" value="AddPredefinedLanguage">
          Add predefined language
        </TabsTrigger>
      </TabsList>
      <TabsContent className="TabsContent" value="AddCustomLanguage">
        <AddCustomLanguage languages={languages} onAddLanguage={onAddLanguage} />
      </TabsContent>
      <TabsContent className="TabsContent" value="AddPredefinedLanguage">
        <AddPredefinedLanguage languages={languages} onAddLanguage={onAddLanguage} />
      </TabsContent>
    </Tabs>
  );
};
