export type ItemStatus = "OPEN" | "RESOLVED";

export type LostItem = {
  _id: string;
  title: string;
  description: string;
  place: string;
  lostAt: string;
  status: ItemStatus;
  contact?: string;
  createdAt: string;
  updatedAt: string;
};

export type LostItemInput = {
  title: string;
  description: string;
  place: string;
  lostAt: string;
  status: ItemStatus;
  contact?: string;
};

export type ApiResponse<T = unknown> = {
  ok: boolean;
  data?: T;
  message?: string;
};

export const PLACES = [
  "본관 1층",
  "본관 2층",
  "본관 3층",
  "급식실",
  "도서관",
  "체육관",
  "실습실 A",
  "실습실 B",
  "운동장",
  "주차장",
  "학생회관",
  "카페테리아",
] as const;
