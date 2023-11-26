export interface SearchResponse {
  score: number;
  show: Show;
}

export interface Show {
  id: number;
  name: string;
  summary: string | null;
  image: { medium: string } | null;
  language: string;
  type: string;
  status: string;
  premiered?: string;
  ended?: string;
}
