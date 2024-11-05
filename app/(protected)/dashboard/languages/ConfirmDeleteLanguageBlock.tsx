'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TLanguage, TLanguageId } from '@/features/languages/types';

export interface TConfirmDeleteLanguageBlockProps {
  language: TLanguage;
  onConfirm: (languageId: TLanguageId) => void;
  onCancel?: () => void;
  className?: string;
}

export function ConfirmDeleteLanguageBlock(props: TConfirmDeleteLanguageBlockProps) {
  const {
    // prettier-ignore
    className,
    language,
    onConfirm,
    onCancel,
  } = props;
  const { id, name } = language;
  return (
    <div className={cn(className, '__ConfirmDeleteLanguageBlock', 'my-4 flex flex-col gap-6')}>
      <p className="Text">
        Delete the language {name} ({id})?
      </p>
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
