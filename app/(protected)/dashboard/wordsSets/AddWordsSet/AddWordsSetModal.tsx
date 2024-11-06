import React from 'react';

import { cn } from '@/lib/utils';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TWordsSet } from '@/features/wordsSets/types';

import { AddWordsSetBlock, TAddWordsSetBlockProps } from './AddWordsSetBlock';

interface TAddWordsSetModalProps extends TAddWordsSetBlockProps {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddWordsSetModal(props: TAddWordsSetModalProps) {
  const { show, toggle, onAddWordsSet, ...restProps } = props;

  const handleAddWordsSet = React.useCallback(
    (wordsSet: TWordsSet) => {
      return (
        onAddWordsSet(wordsSet)
          // Close the modal on finish
          .then((result) => {
            toggle(false);
            return result;
          })
      );
    },
    [onAddWordsSet, toggle],
  );

  return (
    <Modal showModal={show} setShowModal={toggle} className="gap-0">
      <div className={cn('flex flex-col border-b bg-accent px-8 py-4')}>
        <DialogTitle className="DialogTitle">Add Words Set</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          Add words set dialog
        </DialogDescription>
      </div>
      <div className={cn('flex flex-col px-8 py-4')}>
        <AddWordsSetBlock
          // prettier-ignore
          onAddWordsSet={handleAddWordsSet}
          {...restProps}
        />
      </div>
    </Modal>
  );
}

export function useAddWordsSetModal() {
  const [show, toggle] = React.useState(false);

  const AddWordsSetModalWrapper = React.useCallback(
    (props: TAddWordsSetBlockProps) => {
      return (
        <AddWordsSetModal
          // prettier-ignore
          show={show}
          toggle={toggle}
          {...props}
        />
      );
    },
    [show, toggle],
  );
  const showAddWordsSetModal = React.useCallback(() => toggle(true), []);
  const hideAddWordsSetModal = React.useCallback(() => toggle(false), []);

  return React.useMemo(
    () => ({
      isShown: show,
      AddWordsSetModal: AddWordsSetModalWrapper,
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
