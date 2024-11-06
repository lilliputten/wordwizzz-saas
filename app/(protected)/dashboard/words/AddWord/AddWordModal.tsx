import React from 'react';

import { cn } from '@/lib/utils';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TWord } from '@/features/words/types';

import { AddWordBlock, TAddWordBlockProps } from './AddWordBlock';

interface TAddWordModalProps extends TAddWordBlockProps {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddWordModal(props: TAddWordModalProps) {
  const { show, toggle, onAddWord, ...restProps } = props;

  const handleAddWord = React.useCallback(
    (word: TWord) => {
      return (
        onAddWord(word)
          // Close the modal on finish
          .then((result) => {
            toggle(false);
            return result;
          })
      );
    },
    [onAddWord, toggle],
  );

  return (
    <Modal showModal={show} setShowModal={toggle} className="gap-0">
      <div className={cn('flex flex-col border-b bg-accent px-8 py-4')}>
        <DialogTitle className="DialogTitle">Add Word</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          Add word dialog
        </DialogDescription>
      </div>
      <div className={cn('flex flex-col px-8 py-4')}>
        <AddWordBlock
          // prettier-ignore
          onAddWord={handleAddWord}
          {...restProps}
        />
      </div>
    </Modal>
  );
}

export function useAddWordModal() {
  const [show, toggle] = React.useState(false);

  const AddWordModalWrapper = React.useCallback(
    (props: TAddWordBlockProps) => {
      return (
        <AddWordModal
          // prettier-ignore
          show={show}
          toggle={toggle}
          {...props}
        />
      );
    },
    [show, toggle],
  );
  const showAddWordModal = React.useCallback(() => toggle(true), []);
  const hideAddWordModal = React.useCallback(() => toggle(false), []);

  return React.useMemo(
    () => ({
      isShown: show,
      AddWordModal: AddWordModalWrapper,
      showAddWordModal,
      hideAddWordModal,
      toggleShowAddWordModal: toggle,
    }),
    [
      // prettier-ignore
      show,
      AddWordModalWrapper,
      showAddWordModal,
      hideAddWordModal,
    ],
  );
}
