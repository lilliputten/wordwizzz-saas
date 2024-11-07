'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from '@/components/shared/icons';
import { TLanguage, TLanguageId } from '@/features/languages/types';
import { TNewWordsSet, TWordsSet } from '@/features/wordsSets/types';
import { getErrorText } from '@/shared/helpers/strings';
import { tailwindClippingLayout } from '@/shared/helpers/tailwind';

import { maxNameLength, minNameLength } from '../constants/inputFields';

export interface TAddWordsSetBlockProps {
  languages: TLanguage[];
  wordsSets: TWordsSet[];
  onAddWordsSet: (wordsSet: TNewWordsSet, languageIds: TLanguageId[]) => Promise<TWordsSet[]>;
  onCancel?: () => void;
  className?: string;
  forwardPending?: (isPending: boolean) => void;
}

type TLanguagesData = Record<TLanguageId, boolean>;
interface TFormData {
  name: TWordsSet['name'];
  languages: TLanguagesData;
}

const defaultLanguages: TLanguagesData = {
  // DEBUG!
  zh: true,
};
const defaultValues: TFormData = {
  name: '',
  languages: defaultLanguages,
};

export function AddWordsSetBlock(props: TAddWordsSetBlockProps) {
  const {
    // prettier-ignore
    className,
    wordsSets,
    onAddWordsSet,
    onCancel,
    languages,
    forwardPending,
  } = props;

  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => forwardPending?.(isPending), [forwardPending, isPending]);

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
        languages: z.unknown(), // NOTE: This wrong definition allows to pass the form verification with ontouched languages (we don't care)
        // languages: z.record(z.string(), z.boolean()).optional(), // NOTE: This correct definition requires at least one change to language data (WTF?)
      }),
    [refineWordsSetName],
  );

  // @see https://react-hook-form.com/docs/useform
  const form = useForm<TFormData>({
    // @see https://react-hook-form.com/docs/useform
    // mode: 'onChange', // 'all', // Validation strategy before submitting behaviour.
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
    // setFocus,
  } = form;

  // Focus the first field (should it be used with a languages list?)
  // React.useEffect(() => setFocus('name'), [setFocus]);

  const {
    // @see https://react-hook-form.com/docs/useform/formstate
    isDirty, // boolean;
    // errors, // FieldErrors<TFieldValues>;
    isValid, // boolean;
  } = formState;

  /* // DEBUG
   * React.useEffect(() => {
   *   console.log('formState', {
   *     // errors,
   *     isDirty, // boolean;
   *     isValid, // boolean;
   *   });
   * }, [
   *   // errors,
   *   isDirty, // boolean;
   *   isValid, // boolean;
   * ]);
   */

  const isSubmitEnabled = !isPending && isDirty && isValid;

  const onSubmit = handleSubmit((formData) => {
    startTransition(async () => {
      const { name, languages } = formData;
      const newWordsSet: TNewWordsSet = { name };
      const languageIds = Object.entries(languages)
        .map(([id, value]) => value && id)
        .filter(Boolean) as TLanguageId[];
      console.log('[AddWordsSetBlock:onSubmit]', {
        name,
        newWordsSet,
        languageIds,
        languages,
        formData,
      });
      debugger;
      onAddWordsSet(newWordsSet, languageIds)
        .then((_updatedWordsSets) => {
          /* console.log('[AddWordsSetBlock:onSubmit] done', {
           *   _updatedWordsSets,
           * });
           */
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
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={cn(
          // prettier-ignore
          className,
          '__AddWordsSetBlock',
          'flex w-full flex-col gap-4',
          // isPending && 'pointer-events-none opacity-50',
          tailwindClippingLayout({ vertical: true, fullSize: true }),
        )}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormControl>
                <Input
                  type="text"
                  className="flex-1"
                  placeholder="Name"
                  {...field}
                  onChange={(ev) => field.onChange(ev)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-between"></div>
        {/* Languages */}
        {/* NOTE: Checkable list of available languages to include into the words set */}
        <div
          className={cn(
            '__AddWordsSetBlock_Languages',
            'flex w-full flex-col gap-4',
            tailwindClippingLayout({ vertical: true, fullSize: true }),
          )}
        >
          <p className="Text _text-sm _text-muted-foreground">
            Select languages to add to the new set:
          </p>
          <ScrollArea
            className={cn(
              // prettier-ignore
              '__AddWordsSetBlock_Languages_Scroll',
              'flex w-full flex-col gap-4',
              'max-h-full',
            )}
          >
            <div
              className={cn(
                // prettier-ignore
                '__AddWordsSetBlock_Languages_List',
                'flex w-full flex-col gap-6 p-2',
              )}
            >
              {languages.map((lang) => {
                const { id, name: text } = lang;
                const key = 'language-' + id;
                return (
                  <FormField
                    key={key}
                    name={`languages.${id}`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem
                        className={cn(
                          // prettier-ignore
                          '__AddWordsSetBlock_Languages_Item',
                          'flex w-full gap-2',
                        )}
                      >
                        <FormControl>
                          <Checkbox
                            id={key}
                            {...field}
                            checked={field.value}
                            value={id}
                            onCheckedChange={(checked) =>
                              field.onChange({
                                type: 'change',
                                target: {
                                  name: 'languages',
                                  value: id,
                                  type: 'checkbox',
                                  checked,
                                },
                              })
                            }
                          />
                        </FormControl>
                        <Label className="m-0" htmlFor={key}>
                          {text} ({id})
                        </Label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
          </ScrollArea>
          <p className="Text text-sm text-muted-foreground">
            You'll be able to change the languages list for each word set later.
          </p>
        </div>
        <div className="flex flex-col justify-between"></div>
        {/* Actions */}
        <div className="flex w-full gap-4">
          <Button
            type="submit"
            variant={isSubmitEnabled ? 'default' : 'disable'}
            disabled={!isSubmitEnabled}
          >
            {isPending ? (
              <Icons.spinner className="size-4 animate-spin" />
            ) : (
              <span>Add words set</span>
            )}
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            <span>Cancel</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
