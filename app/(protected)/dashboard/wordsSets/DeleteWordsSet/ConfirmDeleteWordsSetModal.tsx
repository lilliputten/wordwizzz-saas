'use client';

import React from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { DialogDescription } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TWordsSet, TWordsSetId } from '@/features/wordsSets/types';

import { ConfirmDeleteWordsSetBlock } from './ConfirmDeleteWordsSetBlock';

interface TConfirmDeleteWordsSetModalProps /* extends TConfirmDeleteWordsSetBlockProps */ {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  wordsSet?: TWordsSet;
  onConfirm: (id: TWordsSetId) => void; // Promise<unknown>;
  onCancel?: () => void;
  isPending?: boolean;
}

function ConfirmDeleteWordsSetModal(props: TConfirmDeleteWordsSetModalProps) {
  const {
    // prettier-ignore
    show,
    toggle,
    onConfirm,
    onCancel,
    wordsSet,
    isPending,
  } = props;
  return (
    <Modal
      showModal={show}
      setShowModal={toggle}
      className={cn(
        // prettier-ignore
        'gap-0',
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
      )}
    >
      <div
        className={cn(
          'flex flex-col border-b bg-accent px-8 py-4',
          // isPending && 'pointer-events-none opacity-50',
        )}
      >
        <DialogTitle className="DialogTitle">Delete Words Set</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          Delete wordsSet dialog
        </DialogDescription>
      </div>
      <div
        className={cn(
          // prettier-ignore
          'flex flex-col px-8 py-4',
          // isPending && 'pointer-events-none opacity-50',
        )}
      >
        {!!wordsSet && (
          <ConfirmDeleteWordsSetBlock
            onConfirm={onConfirm}
            onCancel={onCancel}
            wordsSet={wordsSet}
            isPending={isPending}
          />
        )}
      </div>
    </Modal>
  );
}

interface TConfirmDeleteWordsSetModalParams {
  onDeleteWordsSet: (id: TWordsSetId) => Promise<unknown>;
}

export function useConfirmDeleteWordsSetModal(params: TConfirmDeleteWordsSetModalParams) {
  const { onDeleteWordsSet } = params;
  const [show, toggle] = React.useState(false);
  const [isPending, setPending] = React.useState(false);
  const [wordsSet, setWordsSet] = React.useState<TWordsSet>();

  // const showConfirmDeleteWordsSetModal = React.useCallback(() => toggle(true), []);
  const hideConfirmDeleteWordsSetModal = React.useCallback(() => toggle(false), []);
  const invokeConfirmDeleteWordsSetModal = React.useCallback((wordsSet: TWordsSet) => {
    setWordsSet(wordsSet);
    toggle(true);
  }, []);

  const handleConfirm = React.useCallback(
    (wordsSetId: TWordsSetId) => {
      setPending(true);
      onDeleteWordsSet(wordsSetId)
        // Close the modal on finish
        .then(() => {
          toggle(false);
        })
        // NOTE: Keeping this catch to avoid uncaught exceptions
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[ConfirmDeleteWordsSetModal:handleConfirm] caught', error);
          debugger; // eslint-disable-line no-debugger
        })
        .finally(() => {
          setPending(false);
        });
    },
    [onDeleteWordsSet, toggle],
  );

  const confirmDeleteWordsSetModalElement = React.useMemo(() => {
    return (
      <ConfirmDeleteWordsSetModal
        show={show}
        toggle={toggle}
        wordsSet={wordsSet}
        onConfirm={handleConfirm}
        onCancel={hideConfirmDeleteWordsSetModal}
        isPending={isPending}
      />
    );
  }, [wordsSet, handleConfirm, show, hideConfirmDeleteWordsSetModal, isPending]);

  return React.useMemo(
    () => ({
      isShown: show,
      confirmDeleteWordsSetModalElement,
      hideConfirmDeleteWordsSetModal,
      toggleShowConfirmDeleteWordsSetModal: toggle,
      invokeConfirmDeleteWordsSetModal,
    }),
    [
      show,
      confirmDeleteWordsSetModalElement,
      hideConfirmDeleteWordsSetModal,
      invokeConfirmDeleteWordsSetModal,
    ],
  );
}
