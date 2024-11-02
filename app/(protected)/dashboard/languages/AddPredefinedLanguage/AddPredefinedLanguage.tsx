'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectIcon,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/shared/icons';

import { getErrorText } from '@/shared/helpers/strings';

import { TLanguage, TLanguageId } from '../types/TLanguage';
import { minIdLength, maxIdLength } from '../constants/inputFields';
import { predefinedLanguages } from '../constants/predefinedLanguages';

interface TFormData {
  id?: TLanguageId;
}

const defaultValues: TFormData = {
  id: '',
};

interface TProps {
  languages: TLanguage[];
  onAddLanguage: (language: TLanguage) => Promise<void>;
}

export const AddPredefinedLanguage: React.FC<TProps> = (props) => {
  const { languages, onAddLanguage } = props;
  const [isPending, startTransition] = React.useTransition();

  const languagesList = React.useMemo(() => [...predefinedLanguages], []);

  const refineLanguageId = React.useCallback(
    (value: TLanguageId) => {
      const found = languages.find((lang) => lang.id === value);
      const isError = !!found;
      /* console.log('[AddPredefinedLanguage:refineLanguageId]', {
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
      }),
    [refineLanguageId],
  );

  const {
    // @see https://react-hook-form.com/docs/useform
    formState, // FormState<TFieldValues>;
    handleSubmit, // UseFormHandleSubmit<TFieldValues, TTransformedValues>;
    register, // UseFormRegister<TFieldValues>;
    reset, // UseFormReset<TFieldValues>;
  } = useForm<TFormData>({
    // @see https://react-hook-form.com/docs/useform
    mode: 'all', // Validation strategy before submitting behaviour.
    criteriaMode: 'all', // Display all validation errors or one at a time.
    resolver: zodResolver(formSchema),
    defaultValues, // Default values for the form.
  });

  const {
    // @see https://react-hook-form.com/docs/useform/formstate
    isDirty, // boolean;
    errors, // FieldErrors<TFieldValues>;
    isValid, // boolean;
  } = formState;

  const isSubmitEnabled = !isPending && isDirty && isValid;

  const onSubmit = handleSubmit((formData) => {
    const { id: languageId } = formData;
    const language = languagesList.find(({ id }) => id === languageId);
    /* console.log('[AddPredefinedLanguage:onSubmit]', {
     *   languageId,
     *   languagesList,
     *   language,
     * });
     */
    if (!language) {
      toast.error(`Cannot find a language for the id: "${languageId}"`);
      return;
    }
    startTransition(async () => {
      onAddLanguage(language)
        .then(() => {
          toast.success('New language has been already added.');
          reset();
        })
        .catch((error) => {
          const message = getErrorText(error) || 'An unknown error has occurred.';
          // eslint-disable-next-line no-console
          console.error('[AddPredefinedLanguage:onSubmit]', message, {
            error,
          });
          debugger; // eslint-disable-line no-debugger
          toast.error('Something went wrong.', {
            description: message,
          });
        });
    });
  });

  const registerSelectField = register('id', { required: true });

  /* // DEBUG
   * React.useEffect(() => {
   *   console.log('[AddPredefinedLanguage:DEBUG]', {
   *     registerSelectField,
   *     formState, // FormState<TFieldValues>;
   *     isDirty, // boolean;
   *     errors, // FieldErrors<TFieldValues>;
   *     isValid, // boolean;
   *   });
   * }, [
   *   // prettier-ignore
   *   registerSelectField,
   *   formState, // FormState<TFieldValues>;
   *   isDirty, // boolean;
   *   errors, // FieldErrors<TFieldValues>;
   *   isValid, // boolean;
   * ]);
   */

  return (
    <>
      <div className="__AddPredefinedLanguage p-2 pt-4">
        {/*
        <p className="Text">
          TODO: Add a language from the list.
        </p>
        */}
        <form onSubmit={onSubmit}>
          <div className="mt-4 flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col gap-4">
              <Label className="-sr-only" htmlFor="id">
                Select language
              </Label>

              {/*
              <Controller
                name="id"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    {...registerSelectField}
                    onValueChange={(value) => {
                      return registerSelectField.onChange({ target: { name: 'id', value } });
                    }}
                  >
              */}
              <Select
                {...registerSelectField}
                onValueChange={(value) =>
                  registerSelectField.onChange({ target: { name: 'id', value } })
                }
              >
                <SelectTrigger className="SelectTrigger flex-1" aria-label="Language">
                  <SelectValue placeholder="Select a language…" />
                  <SelectIcon className="SelectIcon">
                    <Icons.chevronDown className="mr-2 size-4" />
                  </SelectIcon>
                </SelectTrigger>
                <SelectContent className="SelectContent">
                  {languagesList.map(({ id, name }) => (
                    <SelectItem value={id} key={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/*
                )}
              />
              */}

              {errors?.id && <p className="pb-0.5 text-[13px] text-red-600">{errors.id.message}</p>}
              <p className="text-[13px] text-muted-foreground">Select a language form the list.</p>
            </div>

            {/*
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
