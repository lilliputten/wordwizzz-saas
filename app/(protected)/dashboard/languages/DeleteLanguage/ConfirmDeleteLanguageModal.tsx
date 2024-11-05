'use client';

import React from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { DialogDescription } from '@/components/ui/dialog';
import { Modal } from '@/components/ui/modal';
import { TLanguage, TLanguageId } from '@/features/languages/types';

import { ConfirmDeleteLanguageBlock } from './ConfirmDeleteLanguageBlock';

interface TConfirmDeleteLanguageModalProps /* extends TConfirmDeleteLanguageBlockProps */ {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  language?: TLanguage;
  onConfirm: (id: TLanguageId) => void; // Promise<unknown>;
  onCancel?: () => void;
  isPending?: boolean;
}

function ConfirmDeleteLanguageModal(props: TConfirmDeleteLanguageModalProps) {
  const {
    // prettier-ignore
    show,
    toggle,
    onConfirm,
    onCancel,
    language,
    isPending,
  } = props;
  return (
    <Modal showModal={show} setShowModal={toggle} className="gap-0">
      <div className={cn('flex flex-col border-b bg-accent px-8 py-4')}>
        <DialogTitle className="DialogTitle">Delete Language</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          Delete language dialog
        </DialogDescription>
      </div>
      <div
        className={cn(
          // prettier-ignore
          'flex flex-col px-8 py-4',
          isPending && 'pointer-events-none opacity-50',
        )}
      >
        {!!language && (
          <ConfirmDeleteLanguageBlock
            onConfirm={onConfirm}
            onCancel={onCancel}
            language={language}
          />
        )}
      </div>
    </Modal>
  );
}

interface TConfirmDeleteLanguageModalParams {
  onDeleteLanguage: (id: TLanguageId) => Promise<unknown>;
}

export function useConfirmDeleteLanguageModal(params: TConfirmDeleteLanguageModalParams) {
  const { onDeleteLanguage } = params;
  const [show, toggle] = React.useState(false);
  const [isPending, setPending] = React.useState(false);
  const [language, setLanguage] = React.useState<TLanguage>();

  // const showConfirmDeleteLanguageModal = React.useCallback(() => toggle(true), []);
  const hideConfirmDeleteLanguageModal = React.useCallback(() => toggle(false), []);
  const invokeConfirmDeleteLanguageModal = React.useCallback((language: TLanguage) => {
    setLanguage(language);
    toggle(true);
  }, []);

  const handleConfirm = React.useCallback(
    (languageId: TLanguageId) => {
      setPending(true);
      onDeleteLanguage(languageId)
        // Close the modal on finish
        .then(() => {
          toggle(false);
        })
        // NOTE: Keeping this catch to avoid uncaught exceptions
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[ConfirmDeleteLanguageModal:handleConfirm] caught', error);
          debugger; // eslint-disable-line no-debugger
        })
        .finally(() => {
          setPending(false);
        });
    },
    [onDeleteLanguage, toggle],
  );

  const confirmDeleteLanguageModalElement = React.useMemo(() => {
    return (
      <ConfirmDeleteLanguageModal
        show={show}
        toggle={toggle}
        language={language}
        onConfirm={handleConfirm}
        onCancel={hideConfirmDeleteLanguageModal}
        isPending={isPending}
      />
    );
  }, [language, handleConfirm, show, hideConfirmDeleteLanguageModal, isPending]);

  return React.useMemo(
    () => ({
      isShown: show,
      confirmDeleteLanguageModalElement,
      hideConfirmDeleteLanguageModal,
      toggleShowConfirmDeleteLanguageModal: toggle,
      invokeConfirmDeleteLanguageModal,
    }),
    [
      show,
      confirmDeleteLanguageModalElement,
      hideConfirmDeleteLanguageModal,
      invokeConfirmDeleteLanguageModal,
    ],
  );
}
