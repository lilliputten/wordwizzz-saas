import { EmptyPlaceholder } from '@/components/shared/empty-placeholder';

export function NoLanguages() {
  return (
    <>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="package" />
        <EmptyPlaceholder.Title>No languages</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You dont have any languages yet. Add any language to yur profile.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </>
  );
}
