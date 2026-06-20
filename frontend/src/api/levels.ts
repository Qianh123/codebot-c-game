import type { LevelDetail, LevelSummary } from "../types/level";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchLevelSummaries(): Promise<LevelSummary[]> {
  return fetchJson<LevelSummary[]>("/api/levels");
}

export function fetchLevelDetail(id: string): Promise<LevelDetail> {
  return fetchJson<LevelDetail>(`/api/levels/${id}`);
}
