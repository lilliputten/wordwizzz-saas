'use client';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TWord } from '@/features/words/types';

export interface TAddWordBlockProps {
  words: TWord[];
  onAddWord: (word: TWord) => Promise<TWord[]>;
  className?: string;
}

export function AddWordBlock(props: TAddWordBlockProps) {
  const { className, words, onAddWord } = props;
  return <p>(AddWordBlock)</p>;
}
