'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TWordsSet, TWordsSetId } from '@/features/wordsSets/types';

export interface TConfirmDeleteWordsSetBlockProps {
  wordsSet: TWordsSet;
  onConfirm: (wordsSetId: TWordsSetId) => void;
  onCancel?: () => void;
  className?: string;
}

export function ConfirmDeleteWordsSetBlock(props: TConfirmDeleteWordsSetBlockProps) {
  const {
    // prettier-ignore
    className,
    wordsSet,
    onConfirm,
    onCancel,
  } = props;
  const { id, name } = wordsSet;
  return (
    <div className={cn(className, '__ConfirmDeleteWordsSetBlock', 'my-4 flex flex-col gap-6')}>
      <p className="Text">Delete the words set "{name}"?</p>
      <div className="flex w-full gap-4">
        <Button type="submit" onClick={() => onConfirm(id)}>
          <span>Delete</span>
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
}
