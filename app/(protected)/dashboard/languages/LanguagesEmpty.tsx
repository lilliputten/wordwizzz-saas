import { TPropsWithClassName } from '@/types/generic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { EmptyPlaceholder } from '@/components/shared/EmptyPlaceholder';
import { Icons } from '@/components/shared/icons';

interface TLanguagesEmptyProps extends TPropsWithClassName {
  showAddLanguageModal: () => void; // React.Dispatch<React.SetStateAction<void>>;
}

export function LanguagesEmpty(props: TLanguagesEmptyProps) {
  const { className, showAddLanguageModal } = props;
  return (
    <EmptyPlaceholder className={cn(className, '__LanguagesEmpty')}>
      <EmptyPlaceholder.Icon name="languages" />
      <EmptyPlaceholder.Title>No languages have been defined yet</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You dont have any languages yet. Add any language to your profile.
      </EmptyPlaceholder.Description>
      <div className="flex w-full justify-center gap-4">
        <Button onClick={showAddLanguageModal}>
          <Icons.add className="mr-2 size-4" />
          <span>Add</span>
          <span className="hidden sm:inline-flex">&nbsp;Language</span>
        </Button>
      </div>
    </EmptyPlaceholder>
  );
}