'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ErrorPlaceHolder } from '@/components/shared/ErrorPlaceHolder';
import { Icons } from '@/components/shared/icons';
import { GenericError, getErrorText } from '@/shared/helpers/strings';

interface TErrorProps {
  error: GenericError; // Error & { message?: string };
  reset?: () => void;
  className?: string;
}

// NOTE: Only plain string should be passed from the server components
// otherwise you'll get an 'Only plain objects... can be passed...' error.

export function LanguagesError({ error, reset, className }: TErrorProps) {
  const errText = getErrorText(error);
  React.useEffect(() => {
    const errText = getErrorText(error);
    // eslint-disable-next-line no-console
    console.error('[LanguagesPage:error]', errText, {
      error,
    });
    // TODO: Log the error to an error reporting service?
  }, [error]);

  return (
    <ErrorPlaceHolder className={cn(className, '__LanguagesError')}>
      <ErrorPlaceHolder.Icon
        name="warning"
        // NOTE: Center warning triangle vertically
        className="-mt-1"
      />
      <ErrorPlaceHolder.Title>Something went wrong!</ErrorPlaceHolder.Title>
      <ErrorPlaceHolder.Description>
        {/* // To show only general message for the users?
        See error log for details.
        */}
        {errText}
      </ErrorPlaceHolder.Description>
      {!!reset && (
        <div className="flex w-full justify-center gap-4">
          <Button onClick={reset}>
            <Icons.refresh className="mr-2 size-4" />
            <span>Try again</span>
          </Button>
        </div>
      )}
    </ErrorPlaceHolder>
  );
}
