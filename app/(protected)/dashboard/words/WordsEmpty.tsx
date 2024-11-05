import { TPropsWithClassName } from '@/types/generic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { EmptyPlaceholder } from '@/components/shared/EmptyPlaceholder';
import { Icons } from '@/components/shared/icons';

interface TWordsEmptyProps extends TPropsWithClassName {
  showAddWordModal?: () => void; // React.Dispatch<React.SetStateAction<void>>;
}

export function WordsEmpty(props: TWordsEmptyProps) {
  const { className, showAddWordModal } = props;
  return (
    <EmptyPlaceholder className={cn(className, '__WordsEmpty')}>
      <EmptyPlaceholder.Icon name="wordsList" />
      <EmptyPlaceholder.Title>No words have been defined yet</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You dont have any words yet. Add any word to your profile.
      </EmptyPlaceholder.Description>
      <div className="flex w-full justify-center gap-4">
        <Button onClick={showAddWordModal}>
          <Icons.add className="mr-2 size-4" />
          <span>Add</span>
          <span className="hidden sm:inline-flex">&nbsp;Word</span>
        </Button>
      </div>
    </EmptyPlaceholder>
  );
}
