'use client';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TLanguage } from '@/features/languages/types';

import { AddCustomLanguage } from './AddCustomLanguage';
import { AddPredefinedLanguage } from './AddPredefinedLanguage';

export interface TAddLanguageBlockProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<TLanguage[]>;
  className?: string;
}

export function AddLanguageBlock(props: TAddLanguageBlockProps) {
  const { className, languages, onAddLanguage } = props;
  return (
    <Tabs
      className={cn(className, '__AddLanguageBlock', 'mt-4')}
      defaultValue="AddPredefinedLanguage"
    >
      <TabsList className={cn('__AddLanguageBlock_Tabs')}>
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
}
