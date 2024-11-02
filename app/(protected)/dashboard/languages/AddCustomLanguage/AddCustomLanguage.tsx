'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/shared/icons';

import { getErrorText } from '@/shared/helpers/strings';

import { TLanguage, TLanguageId } from '../types/TLanguage';
import { minIdLength, maxIdLength, minNameLength, maxNameLength } from '../constants/inputFields';

type TFormData = TLanguage;

interface TProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<void>;
}

const defaultValues: TLanguage = {
  id: '',
  name: '',
};

export const AddCustomLanguage: React.FC<TProps> = (props) => {
  const { languages, onAddLanguage } = props;
  const [isPending, startTransition] = React.useTransition();

  const refineLanguageId = React.useCallback(
    (value: TLanguageId) => {
      const found = languages.find((lang) => lang.id === value);
      const isError = !!found;
      /* console.log('[AddCustomLanguage:refineLanguageId]', {
       *   value,
       *   isError,
       *   languages,
       * });
       */
      return !isError;
    },
    [languages],
  );
  const formSchema = React.useMemo(
    () =>
      z.object({
        id: z.string().min(minIdLength).max(maxIdLength).refine(refineLanguageId, {
          message: 'The language id already exists in your languages list',
        }),
        name: z.string().min(minNameLength).max(maxNameLength),
      }),
    [refineLanguageId],
  );

  const {
    // @see https://react-hook-form.com/docs/useform
    formState, // FormState<TFieldValues>;
    handleSubmit, // UseFormHandleSubmit<TFieldValues, TTransformedValues>;
    register, // UseFormRegister<TFieldValues>;
    // trigger, // UseFormTrigger<TFieldValues>;
    // watch, // UseFormWatch<TFieldValues>;
    // getValues, // UseFormGetValues<TFieldValues>;
    // getFieldState, // UseFormGetFieldState<TFieldValues>;
    // setError, // UseFormSetError<TFieldValues>;
    // clearErrors, // UseFormClearErrors<TFieldValues>;
    // setValue, // UseFormSetValue<TFieldValues>;
    // resetField, // UseFormResetField<TFieldValues>;
    reset, // UseFormReset<TFieldValues>;
    // unregister, // UseFormUnregister<TFieldValues>;
    // control, // Control<TFieldValues, TContext>;
    // setFocus, // UseFormSetFocus<TFieldValues>;
  } = useForm<TFormData>({
    // @see https://react-hook-form.com/docs/useform
    mode: 'all', // Validation strategy before submitting behaviour.
    criteriaMode: 'all', // Display all validation errors or one at a time.
    resolver: zodResolver(formSchema),
    defaultValues, // Default values for the form.
    // shouldFocusError: true, // Enable or disable built-in focus management.
    // reValidateMode, // Validation strategy after submitting behaviour.
    // values, // Reactive values to update the form values.
    // errors, // Reactive errors to update the form errors.
    // resetOptions, // Option to reset form state update while updating new form values.
    // delayError, // Delay error from appearing instantly.
    // shouldUseNativeValidation, // Use browser built-in form constraint API.
    // shouldUnregister, // Enable and disable input unregister after unmount.
  });

  const {
    // @see https://react-hook-form.com/docs/useform/formstate
    isDirty, // boolean;
    errors, // FieldErrors<TFieldValues>;
    isValid, // boolean;
    // isLoading, // boolean;
    // isSubmitted, // boolean;
    // isSubmitSuccessful, // boolean;
    // isSubmitting, // boolean;
    // isValidating, // boolean;
    // disabled, // boolean;
    // submitCount, // number;
    // dirtyFields, // Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
    // touchedFields, // Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
    // validatingFields, // Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
    // // defaultValues, // undefined | Readonly<DeepPartial<TFieldValues>>;
  } = formState;

  /* // Effect: Languages has been updated
   * // eslint-disable-next-line react-hooks/exhaustive-deps
   * const originalLanguages = React.useMemo(() => languages, []);
   * React.useEffect(() => {
   *   if (originalLanguages !== languages) {
   *     console.log('[AddCustomLanguage:Effect: Languages has been updated]', {
   *       keys: Object.keys(languages),
   *       languages,
   *     });
   *     debugger;
   *     trigger('id');
   *   }
   * }, [originalLanguages, languages, trigger]);
   */

  const isSubmitEnabled = !isPending && isDirty && isValid;

  const onSubmit = handleSubmit((language) => {
    /* console.log('[AddCustomLanguage:onSubmit]', {
     *   language,
     * });
     */
    startTransition(async () => {
      onAddLanguage(language)
        .then(() => {
          toast.success('New language has been already added.');
          reset();
        })
        .catch((error) => {
          const message = getErrorText(error) || 'An unknown error has occurred.';
          // eslint-disable-next-line no-console
          console.error('[AddCustomLanguage:onSubmit]', message, {
            error,
          });
          debugger; // eslint-disable-line no-debugger
          toast.error('Something went wrong.', {
            description: message,
          });
        });
    });
  });

  return (
    <>
      {/*
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Add a new language</CardTitle>
          </div>
        </CardHeader>
      </Card>
      */}
      <div className="__AddCustomLanguage p-2 pt-4">
        <p className="Text">
          Add your own language with a custom (but unique) identifier and name.
        </p>
        <form onSubmit={onSubmit}>
          <div className="mt-4 flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col gap-4">
              <Label className="-sr-only" htmlFor="id">
                ID
              </Label>
              <Input
                id="id"
                className="flex-1"
                size={maxIdLength}
                // @see https://react-hook-form.com/docs/useform/register
                {...register('id', {
                  required: true,
                })}
              />
              {errors?.id && <p className="pb-0.5 text-[13px] text-red-600">{errors.id.message}</p>}
              <p className="text-[13px] text-muted-foreground">
                Should be an unique value. {minIdLength}-{maxIdLength} characters.
              </p>
            </div>
            <div className="flex w-full flex-col gap-4">
              <Label className="-sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                className="flex-1"
                size={maxNameLength}
                // @see https://react-hook-form.com/docs/useform/register
                {...register('name', { required: true })}
              />
              {errors?.name && (
                <p className="pb-0.5 text-[13px] text-red-600">{errors.name.message}</p>
              )}
              <p className="text-[13px] text-muted-foreground">
                {minNameLength}-{maxNameLength} characters.
              </p>
            </div>
            {/*
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            */}
            <div className="flex flex-col justify-between p-1"></div>
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
                  <p>
                    Add
                    <span className="hidden sm:inline-flex">&nbsp;Language</span>
                  </p>
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-between p-1"></div>
        </form>
      </div>
    </>
  );
};
