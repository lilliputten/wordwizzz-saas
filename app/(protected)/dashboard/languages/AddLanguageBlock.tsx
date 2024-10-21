'use client';

import React from 'react';
// import { useState, useTransition } from 'react';
import { updateUserName } from '@/actions/update-user-name';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionColumns } from '@/components/dashboard/section-columns';
import { Icons } from '@/components/shared/icons';

import { TLanguage, TLanguageId } from './types/TLanguage';

type FormData = TLanguage;

export const formSchema = z.object({
  id: z.string().min(2 /* , { message: 'ID is required' } */).max(16),
  name: z.string().min(4).max(32),
});

interface TProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => void;
}

const defaultValues: TLanguage = {
  id: '',
  name: '',
};

export const AddLanguageBlock: React.FC<TProps> = (props) => {
  const { languages, onAddLanguage } = props;
  // return <>AddLanguageBlock</>;
  // const { update } = useSession();
  // const [updated, setUpdated] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  // const updateUserNameWithId = updateUserName.bind(null, user.id);

  const {
    formState, // FormState<TFieldValues>;
    handleSubmit, // UseFormHandleSubmit<TFieldValues, TTransformedValues>;
    register, // UseFormRegister<TFieldValues>;
    // trigger, // UseFormTrigger<TFieldValues>;
    // watch, // UseFormWatch<TFieldValues>;
    // getValues, // UseFormGetValues<TFieldValues>;
    // getFieldState, // UseFormGetFieldState<TFieldValues>;
    setError, // UseFormSetError<TFieldValues>;
    clearErrors, // UseFormClearErrors<TFieldValues>;
    // setValue, // UseFormSetValue<TFieldValues>;
    // resetField, // UseFormResetField<TFieldValues>;
    // reset, // UseFormReset<TFieldValues>;
    // unregister, // UseFormUnregister<TFieldValues>;
    // control, // Control<TFieldValues, TContext>;
    // setFocus, // UseFormSetFocus<TFieldValues>;
  } = useForm<FormData>({
    criteriaMode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
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

  const hasErrors = !!Object.keys(errors).length;

  const onSubmit = handleSubmit((language) => {
    console.log('[AddLanguageBlock:onSubmit]', {
      language,
    });
    onAddLanguage(language);
    /* // SAMPLE
    startTransition(async () => {
      const { status } = await updateUserNameWithId(data);
      if (status !== 'success') {
        toast.error('Something went wrong.', {
          description: 'Your name was not updated. Please try again.',
        });
      } else {
        await update();
        setUpdated(false);
        toast.success('Your name has been updated.');
      }
    });
    */
  });

  const checkId = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      const id = target.value as TLanguageId;
      const found = languages.find((lang) => lang.id === id);
      console.log('[AddLanguageBlock:checkId]', {
        found,
        id,
        target,
      });
      if (found) {
        setError('id', {
          type: 'found',
          message: 'This language id already exists in your languages list',
        });
      } else {
        clearErrors('id');
      }
    },
    [languages, setError, clearErrors],
  );

  /* // UNUSED
   * const checkUpdate = (value) => {
   *   setUpdated(!!value);
   * };
   * const handleCheckUpdate = React.useCallback(
   *   (e: React.ChangeEvent<HTMLInputElement>) => {
   *     const { target } = e;
   *     const { value } = target;
   *     const id = target.id as keyof FormData;
   *     console.log('[AddLanguageBlock:handleCheckUpdate]', {
   *       value,
   *       id,
   *       target,
   *     });
   *     setTimeout(() => {
   *       trigger(id, { shouldFocus: true }).then((result) => {
   *         console.log('[AddLanguageBlock:handleCheckUpdate] result', {
   *           result,
   *           value,
   *           id,
   *           target,
   *         });
   *       });
   *     }, 10);
   *   },
   *   [trigger],
   * );
   */

  const isSubmitEnabled = !isPending && isDirty && isValid;

  console.log('XXX', {
    isSubmitEnabled,
    isValid,
    isDirty,
    hasErrors,
    errors,
  });

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Add a new language</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col gap-4">
              <Label className="-sr-only" htmlFor="id">
                ID
              </Label>
              <Input
                id="id"
                className="flex-1"
                size={32}
                {...register('id', { required: true })}
                // onChange={handleCheckUpdate}
                onChange={checkId}
              />
              {errors?.id && <p className="pb-0.5 text-[13px] text-red-600">{errors.id.message}</p>}
              <p className="text-[13px] text-muted-foreground">Max 16 characters</p>
            </div>
            <div className="flex w-full flex-col gap-4">
              <Label className="-sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                className="flex-1"
                size={32}
                {...register('name', { required: true })}
                // onChange={handleCheckUpdate}
              />
              {errors?.name && (
                <p className="pb-0.5 text-[13px] text-red-600">{errors.name.message}</p>
              )}
              <p className="text-[13px] text-muted-foreground">Max 32 characters</p>
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
      </CardContent>
    </Card>
  );
};
