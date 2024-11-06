'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/shared/icons';
import { TLanguage, TLanguageId } from '@/features/languages/types';
import { TWordsSet } from '@/features/wordsSets/types';
import { getErrorText } from '@/shared/helpers/strings';

import { maxIdLength, maxNameLength, minIdLength, minNameLength } from '../constants/inputFields';

// import { AddCustomWordsSet } from './AddCustomWordsSet';
// import { AddPredefinedWordsSet } from './AddPredefinedWordsSet';

export interface TAddWordsSetBlockProps {
  languages: TLanguage[];
  wordsSets: TWordsSet[];
  onAddWordsSet: (wordsSet: TWordsSet) => Promise<TWordsSet[]>;
  className?: string;
}

type TFormData = TWordsSet;

const defaultValues: TWordsSet = {
  id: '',
  name: '',
};

export function AddWordsSetBlock(props: TAddWordsSetBlockProps) {
  const {
    className,
    wordsSets,
    onAddWordsSet,
    // TODO
    languages,
  } = props;

  const [isPending, startTransition] = React.useTransition();

  const refineWordsSetName = React.useCallback(
    (value: string) => {
      const found = wordsSets.find((item) => item.name === value);
      return !found;
    },
    [wordsSets],
  );
  const formSchema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(minNameLength).max(maxNameLength).refine(refineWordsSetName, {
          message: 'This words set name is not unique: Choose another one, please.',
        }),
      }),
    [refineWordsSetName],
  );

  // @see https://react-hook-form.com/docs/useform
  const form = useForm<TFormData>({
    // @see https://react-hook-form.com/docs/useform
    mode: 'all', // Validation strategy before submitting behaviour.
    criteriaMode: 'all', // Display all validation errors or one at a time.
    resolver: zodResolver(formSchema),
    defaultValues, // Default values for the form.
  });
  const {
    // @see https://react-hook-form.com/docs/useform
    formState, // FormState<TFieldValues>;
    handleSubmit, // UseFormHandleSubmit<TFieldValues, TTransformedValues>;
    // register, // UseFormRegister<TFieldValues>;
    reset, // UseFormReset<TFieldValues>;
    setFocus,
  } = form;

  // Default field
  React.useEffect(() => setFocus('name'), [setFocus]);

  const {
    // @see https://react-hook-form.com/docs/useform/formstate
    isDirty, // boolean;
    // errors, // FieldErrors<TFieldValues>;
    isValid, // boolean;
  } = formState;

  const isSubmitEnabled = !isPending && isDirty && isValid;

  const onSubmit = handleSubmit((wordsSet) => {
    startTransition(async () => {
      onAddWordsSet(wordsSet)
        .then((_updatedWordsSets) => {
          reset();
        })
        .catch((error) => {
          const message = getErrorText(error) || 'An unknown error has occurred.';
          // eslint-disable-next-line no-console
          console.error('[AddCustomLanguage:onSubmit]', message, {
            error,
          });
          debugger; // eslint-disable-line no-debugger
        });
    });
  });

  return (
    <div className={cn(className, '__AddWordsSetBlock', 'py-2')}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                {/*
                <FormLabel>Name</FormLabel>
                */}
                <FormControl>
                  <Input
                    // @see https://react-hook-form.com/docs/useform/register
                    type="text"
                    className="flex-1"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Languages */}
          <div className="flex w-full flex-col gap-4">
            {/* TODO: Checkable list of available languages to include into the words set */}
            (Languages selection)
          </div>
          {/* Actions */}
          <div className="flex w-full gap-4">
            <Button
              type="submit"
              variant={isSubmitEnabled ? 'default' : 'disable'}
              disabled={!isSubmitEnabled}
              className="w-[67px] shrink-0 px-0 sm:w-[130px]"
            >
              {isPending ? (
                <Icons.spinner className="size-4 animate-spin" />
              ) : (
                <span>Add Words Set</span>
              )}
            </Button>
          </div>
          {/*
          </div>
          <div className="flex flex-col justify-between p-1"></div>
          */}
        </form>
      </Form>
    </div>
  );
}
