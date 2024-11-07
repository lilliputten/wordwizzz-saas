import React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TLanguage, TLanguageId } from '@/features/languages/types';
import { TNewWordsSet, TWordsSet } from '@/features/wordsSets/types';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';

import { AddWordsSetBlock, TAddWordsSetBlockProps } from './AddWordsSetBlock';

interface TAddWordsSetModalProps /* extends TAddWordsSetBlockProps */ {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;

  languages: TLanguage[];
  wordsSets: TWordsSet[];
  // onAddWordsSet: (wordsSet: TWordsSet) => Promise<TWordsSet[]>;
  onAddWordsSet: (wordsSet: TNewWordsSet, languageIds: TLanguageId[]) => Promise<TWordsSet[]>;
}

function AddWordsSetModal(props: TAddWordsSetModalProps) {
  const { show, toggle, onAddWordsSet, ...restProps } = props;
  const [isPending, setPending] = React.useState(false);

  React.useEffect(() => {
    console.log('[AddWordsSetModal:isPending]', {
      isPending,
    });
  }, [isPending]);

  const handleAddWordsSet = React.useCallback(
    (wordsSet: TNewWordsSet, languageIds: TLanguageId[]) => {
      return (
        onAddWordsSet(wordsSet, languageIds)
          // Close the modal on finish
          .then((result) => {
            toggle(false);
            return result;
          })
      );
    },
    [onAddWordsSet, toggle],
  );

  const { isMobile } = useMediaQuery();

  return (
    <Modal
      showModal={show}
      setShowModal={toggle}
      className={cn(
        // prettier-ignore
        '__AddWordsSetModal',
        !isMobile && 'max-h-[90vh]',
        'flex flex-col gap-0',
        // tailwindClippingLayout({ vertical: true }),
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
      )}
    >
      <div
        className={cn(
          // prettier-ignore
          '__AddWordsSetModal_Header',
          'flex flex-col border-b bg-accent px-8 py-4',
        )}
      >
        <DialogTitle className="DialogTitle">Add Words Set</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          Add words set dialog
        </DialogDescription>
      </div>
      <div
        className={cn(
          '__AddWordsSetModal__Content',
          tailwindClippingLayout(),
          'flex flex-1 flex-col',
        )}
      >
        <AddWordsSetBlock
          onAddWordsSet={handleAddWordsSet}
          className={cn('__AddWordsSetModal__ContentBlock', 'p-8')}
          forwardPending={setPending}
          {...restProps}
        />
      </div>
    </Modal>
  );
}

export function useAddWordsSetModal() {
  const [show, toggle] = React.useState(false);

  const showAddWordsSetModal = React.useCallback(() => toggle(true), []);
  const hideAddWordsSetModal = React.useCallback(() => toggle(false), []);

  const AddWordsSetModalWrapper = React.useCallback(
    (props: TAddWordsSetBlockProps) => {
      return (
        <AddWordsSetModal
          // prettier-ignore
          show={show}
          toggle={toggle}
          onCancel={hideAddWordsSetModal}
          {...props}
        />
      );
    },
    [show, toggle, hideAddWordsSetModal],
  );

  return React.useMemo(
    () => ({
      isShown: show,
      AddWordsSetModalWrapper,
      showAddWordsSetModal,
      hideAddWordsSetModal,
      toggleShowAddWordsSetModal: toggle,
    }),
    [
      // prettier-ignore
      show,
      AddWordsSetModalWrapper,
      showAddWordsSetModal,
      hideAddWordsSetModal,
    ],
  );
}
