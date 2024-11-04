import { TLanguage } from '@/features/languages/types';

import jsonLanguages from './ISO-639-1-language.json';

/* // Derive types (is it rquired?)
 * import { ArrayElement } from '@/shared/helpers/ts';
 * type TISOLanguages = typeof jsonLanguages;
 * type TISOLanguage = ArrayElement<TISOLanguages>;
 */

export const isoLanguages = jsonLanguages.map(
  ({ code, name }) => ({ id: code, name }) as TLanguage,
);
