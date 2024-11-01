import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { UserAvatar } from '@/components/shared/user-avatar';

function AddLanguageModal({
  showAddLanguageModal,
  setShowAddLanguageModal,
}: {
  showAddLanguageModal: boolean;
  setShowAddLanguageModal: Dispatch<SetStateAction<boolean>>;
}) {
  // const { data: session } = useSession();
  const [adding, setAdding] = useState(false);

  async function addLanguage() {
    setAdding(true);
    console.log('[AddLanguageodal:addLanguage]');
    debugger;
    setAdding(false);
    /*
     * // TODO: Add language in the database and local storage?
     */
    /* // Old code (sample)
    await fetch(`/api/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      if (res.status === 200) {
        // delay to allow for the route change to complete
        await new Promise((resolve) =>
          setTimeout(() => {
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
            resolve(null);
          }, 500),
        );
      } else {
        setAdding(false);
        const error = await res.text();
        throw error;
      }
    });
    */
  }

  return (
    <Modal
      showModal={showAddLanguageModal}
      setShowModal={setShowAddLanguageModal}
      className="gap-0"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <h3 className="text-lg font-semibold">Delete Language</h3>

        {/* TODO: Use getUserSubscriptionPlan(session.user.id) to display the user's subscription if he have a paid plan */}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(addLanguage(), {
            loading: 'Adding language...',
            success: 'Language added successfully!',
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label htmlFor="verification" className="block text-sm">
            To verify, type{' '}
            <span className="font-semibold text-black dark:text-white">confirm add language</span>{' '}
            below
          </label>
          <Input
            type="text"
            name="verification"
            id="verification"
            pattern="confirm add language"
            required
            autoFocus={false}
            autoComplete="off"
            className="mt-1 w-full border bg-background"
          />
        </div>

        <Button variant={adding ? 'disable' : 'destructive'} disabled={adding}>
          Confirm add language
        </Button>
      </form>
    </Modal>
  );
}

export function useAddLanguageModal() {
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);

  const AddLanguageModalCallback = useCallback(() => {
    return (
      <AddLanguageModal
        showAddLanguageModal={showAddLanguageModal}
        setShowAddLanguageModal={setShowAddLanguageModal}
      />
    );
  }, [showAddLanguageModal, setShowAddLanguageModal]);

  return useMemo(
    () => ({
      setShowAddLanguageModal,
      AddLanguageModal: AddLanguageModalCallback,
    }),
    [setShowAddLanguageModal, AddLanguageModalCallback],
  );
}
