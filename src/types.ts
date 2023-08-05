export type ContextState = {
  query: string;
  setQuery: (v: string) => void;
  results: ResultType[] | null;
  addResults: (v: ResultType) => void;
  resetResults: () => void;
  setElement: (v: HTMLDivElement) => void;
  searchElement: HTMLInputElement | null;
  setSearchElement: (v: HTMLInputElement) => void;
};

export type ResultType = [string, HTMLDivElement];
