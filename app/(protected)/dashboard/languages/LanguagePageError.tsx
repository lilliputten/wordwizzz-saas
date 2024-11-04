'use client';

import React from 'react';
import { GenericError, getErrorText } from '@/shared/helpers/strings';
import { toast } from 'sonner';

interface TErrorProps {
  error: GenericError; // Error & { message?: string };
  reset?: () => void;
}

export function LanguagePageError({ error, reset }: TErrorProps) {
  React.useEffect(() => {
    const errText = getErrorText(error);
    // TODO: Show toast?
    toast.error('Something went wrong.', {
      description: errText, // Is it neccessary and safe to show the error text to the user?
    });
    // eslint-disable-next-line no-console
    console.error('[LanguagesPage:error]', errText, {
      error,
    });
    // TODO: Log the error to an error reporting service?
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <p className="text-center text-sm">See error log for details.</p>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        // Attempt to recover by trying to re-render the invoices route
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
