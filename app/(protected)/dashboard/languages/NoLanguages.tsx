import { TPropsWithClassName } from '@/types/generic';
import { EmptyPlaceholder } from '@/components/shared/empty-placeholder';

export function NoLanguages(props: TPropsWithClassName) {
  const { className } = props;
  return (
    <>
      <EmptyPlaceholder className={className}>
        <EmptyPlaceholder.Icon name="package" />
        <EmptyPlaceholder.Title>No languages</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You dont have any languages yet. Add any language to your profile.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </>
  );
}
