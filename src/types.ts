export type ContextState = {
  query: string;
  setQuery: (v: string) => void;
  results: ResultType[];
  addResults: (v: ResultType) => void;
  resetResults: () => void;
  setElement: (v: HTMLDivElement) => void;
};

export type ResultType = [string, HTMLDivElement];
