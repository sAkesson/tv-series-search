export interface SearchResponse {
  score: number;
  show: Show;
}

export interface Show {
  id: number;
  name: string;
  summary: string;
}
