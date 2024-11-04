'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TLanguage } from '@/features/languages/types';

import { AddCustomLanguage } from './AddCustomLanguage';
import { AddPredefinedLanguage } from './AddPredefinedLanguage';

interface TProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<TLanguage[]>;
  className?: string;
}

export const AddLanguageBlock: React.FC<TProps> = (props) => {
  const { className, languages, onAddLanguage } = props;
  return (
    <Tabs
      className={cn(className, '__AddLanguageBlock_Tabs', 'mt-4')}
      defaultValue="AddPredefinedLanguage"
    >
      <TabsList>
        <TabsTrigger className="TabsTrigger" value="AddPredefinedLanguage">
          Add predefined language
        </TabsTrigger>
        <TabsTrigger className="TabsTrigger" value="AddCustomLanguage">
          Add custom language
        </TabsTrigger>
      </TabsList>
      <TabsContent className="TabsContent" value="AddPredefinedLanguage">
        <AddPredefinedLanguage languages={languages} onAddLanguage={onAddLanguage} />
      </TabsContent>
      <TabsContent className="TabsContent" value="AddCustomLanguage">
        <AddCustomLanguage languages={languages} onAddLanguage={onAddLanguage} />
      </TabsContent>
    </Tabs>
  );
};
