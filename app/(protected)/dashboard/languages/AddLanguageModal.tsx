import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { UserAvatar } from '@/components/shared/user-avatar';
import { TLanguage } from '@/features/languages/types';

import { AddLanguageBlock, TAddLanguageBlockProps } from './AddLanguageBlock';

interface TAddLanguageModalProps extends TAddLanguageBlockProps {
  show: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddLanguageModal(props: TAddLanguageModalProps) {
  const { show, toggle, onAddLanguage, ...restProps } = props;

  const handleAddLanguage = React.useCallback(
    (language: TLanguage) => {
      return (
        onAddLanguage(language)
          // Close the modal on finish
          .then((result) => {
            toggle(false);
            return result;
          })
      );
    },
    [onAddLanguage, toggle],
  );

  return (
    <Modal showModal={show} setShowModal={toggle} className="gap-0">
      <div className={cn('flex flex-col border-b bg-accent px-8 py-4')}>
        <h3 className="text-lg font-semibold">Add Language</h3>
      </div>
      <div className={cn('flex flex-col px-8 py-4')}>
        <AddLanguageBlock
          // prettier-ignore
          onAddLanguage={handleAddLanguage}
          {...restProps}
        />
      </div>
    </Modal>
  );
}

export function useAddLanguageModal() {
  const [show, toggle] = React.useState(false);

  const AddLanguageModalWrapper = React.useCallback(
    (props: TAddLanguageBlockProps) => {
      return (
        <AddLanguageModal
          // prettier-ignore
          show={show}
          toggle={toggle}
          {...props}
        />
      );
    },
    [show, toggle],
  );
  const showAddLanguageModal = React.useCallback(() => toggle(true), []);
  const hideAddLanguageModal = React.useCallback(() => toggle(false), []);

  return React.useMemo(
    () => ({
      isShown: show,
      AddLanguageModal: AddLanguageModalWrapper,
      showAddLanguageModal,
      hideAddLanguageModal,
      toggleShowAddLanguageModal: toggle,
    }),
    [
      // prettier-ignore
      show,
      AddLanguageModalWrapper,
      showAddLanguageModal,
      hideAddLanguageModal,
    ],
  );
}
