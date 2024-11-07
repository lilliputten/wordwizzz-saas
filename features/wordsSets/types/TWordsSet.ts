export type TWordsSetId = string;
/** Client (clean) data */
export interface TWordsSet {
  id: TWordsSetId; // Is defined only for existed records
  name: string;
}
/** New record (the id will be obtained automatically on the server) */
export type TNewWordsSet = Omit<TWordsSet, 'id'>;
