export type TWordsSetId = string;
// Client (clean) data
export interface TWordsSet {
  id: TWordsSetId; // Is defined only for existed records
  name: string;
}
