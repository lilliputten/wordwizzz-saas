'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/shared/icons';
import { TLanguage } from '@/features/languages/types';

import { AddCustomLanguage } from './AddCustomLanguage';
import { useAddLanguageModal } from './AddLanguageModal';
import { AddPredefinedLanguage } from './AddPredefinedLanguage';

export interface TAddLanguageBlockProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<TLanguage[]>;
  className?: string;
}

/*
 * export const AddLanguageBlockWithModal: React.FC<TAddLanguageBlockProps> = (props) => {
 *   const { className, languages, onAddLanguage } = props;
 *   // const { showAddLanguageModal, AddLanguageModal } = useAddLanguageModal();
 *   const isPending = false;
 *   return (
 *     <div className={cn(className, '__AddLanguageBlock_Tabs', 'flex w-full gap-4')}>
 *       <Button
 *         // type="submit"
 *         variant="default"
 *         className="w-[67px] shrink-0 px-0 sm:w-[130px]"
 *         onClick={() => setShowAddLanguageModal(true)}
 *       // >
 *         {isPending ? (
 *           <Icons.spinner className="size-4 animate-spin" />
 *         ) : (
 *           <p>
 *             Add
 *             <span className="hidden sm:inline-flex">&nbsp;Language</span>
 *           </p>
 *         )}
 *       </Button>
 *     </div>
 *   );
 * };
 */

export function AddLanguageBlock(props: TAddLanguageBlockProps) {
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
}
