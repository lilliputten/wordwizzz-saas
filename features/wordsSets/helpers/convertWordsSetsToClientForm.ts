import { TWordsSet } from '../types';

export function convertWordsSetsToClientForm(wordsSets: TWordsSet[]) {
  return wordsSets.map(({ id, name }) => ({ id, name }) as TWordsSet);
}
