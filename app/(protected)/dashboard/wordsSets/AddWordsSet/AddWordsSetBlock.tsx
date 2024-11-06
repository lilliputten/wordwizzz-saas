'use client';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TWordsSet } from '@/features/wordsSets/types';

// import { AddCustomWordsSet } from './AddCustomWordsSet';
// import { AddPredefinedWordsSet } from './AddPredefinedWordsSet';

export interface TAddWordsSetBlockProps {
  wordsSets: TWordsSet[];
  onAddWordsSet: (wordsSet: TWordsSet) => Promise<TWordsSet[]>;
  className?: string;
}

export function AddWordsSetBlock(props: TAddWordsSetBlockProps) {
  const { className, wordsSets, onAddWordsSet } = props;
  return <p>(AddWordsSetBlock)</p>;
}
