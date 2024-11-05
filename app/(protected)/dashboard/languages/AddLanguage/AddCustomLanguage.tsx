'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/shared/icons';
import { TLanguage, TLanguageId } from '@/features/languages/types';
import { getErrorText } from '@/shared/helpers/strings';

import { maxIdLength, maxNameLength, minIdLength, minNameLength } from '../constants/inputFields';

type TFormData = TLanguage;

interface TProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<TLanguage[]>;
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
      return !isError;
    },
    [languages],
  );
  const formSchema = React.useMemo(
    () =>
      z.object({
        id: z.string().min(minIdLength).max(maxIdLength).refine(refineLanguageId, {
          message:
            'This language is not unique: The language id already exists in your languages list',
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
    // defaultValues, // undefined | Readonly<DeepPartial<TFieldValues>>;
  } = formState;

  const isSubmitEnabled = !isPending && isDirty && isValid;

  const onSubmit = handleSubmit((language) => {
    startTransition(async () => {
      onAddLanguage(language)
        .then((_updatedLanguages) => {
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
    <>
      <div className="__AddCustomLanguage p-2">
        <p className="Text mb-4 text-[13px] text-muted-foreground">
          Add your own language with a custom (but unique) identifier and name.
        </p>
        <form onSubmit={onSubmit}>
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col gap-4">
              {/*
              <Label className="-sr-only" htmlFor="id">
                ID
              </Label>
              */}
              <Input
                id="id"
                className="flex-1"
                size={maxIdLength}
                placeholder="ID"
                // @see https://react-hook-form.com/docs/useform/register
                {...register('id', {
                  required: true,
                })}
              />
              {errors?.id && <p className="pb-0.5 text-[13px] text-red-600">{errors.id.message}</p>}
              {/*
              <p className="text-[13px] text-muted-foreground">
                Should be an unique value. {minIdLength}-{maxIdLength} characters.
              </p>
              */}
            </div>
            <div className="flex w-full flex-col gap-4">
              {/*
              <Label className="-sr-only" htmlFor="name">
                Name
              </Label>
              */}
              <Input
                id="name"
                className="flex-1"
                size={maxNameLength}
                placeholder="Name"
                // @see https://react-hook-form.com/docs/useform/register
                {...register('name', { required: true })}
              />
              {errors?.name && (
                <p className="pb-0.5 text-[13px] text-red-600">{errors.name.message}</p>
              )}
              {/*
              <p className="text-[13px] text-muted-foreground">
                {minNameLength}-{maxNameLength} characters.
              </p>
              */}
            </div>
            {/*
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div className="flex flex-col justify-between p-1"></div>
            */}
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
          {/*
          <div className="flex flex-col justify-between p-1"></div>
          */}
        </form>
      </div>
    </>
  );
};
