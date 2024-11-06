import { TPropsWithClassName } from '@/types/generic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { EmptyPlaceholder } from '@/components/shared/EmptyPlaceholder';
import { Icons } from '@/components/shared/icons';

interface TWordsSetsEmptyProps extends TPropsWithClassName {
  showAddWordsSetModal?: () => void; // React.Dispatch<React.SetStateAction<void>>;
}

export function WordsSetsEmpty(props: TWordsSetsEmptyProps) {
  const { className, showAddWordsSetModal } = props;
  return (
    <EmptyPlaceholder className={cn(className, '__WordsSetsEmpty')}>
      <EmptyPlaceholder.Icon name="wordsList" />
      <EmptyPlaceholder.Title>No words sets have been defined yet</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You dont have any words sets yet. Add any wordsSet to your profile.
      </EmptyPlaceholder.Description>
      <div className="flex w-full justify-center gap-4">
        <Button onClick={showAddWordsSetModal}>
          <Icons.add className="mr-2 size-4" />
          <span>Add</span>
          <span className="hidden sm:inline-flex">&nbsp;Words Set</span>
        </Button>
      </div>
    </EmptyPlaceholder>
  );
}
