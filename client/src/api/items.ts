import axios from 'axios';
import { ApiResponse, LostItem, LostItemInput } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export interface GetItemsParams {
  status?: string;
  place?: string;
  q?: string;
}

export const getItems = async (params: GetItemsParams = {}): Promise<LostItem[]> => {
  const { data } = await api.get<ApiResponse<LostItem[]>>('/items', { params });
  if (!data.ok) throw new Error(data.message);
  return data.data || [];
};

export const getItem = async (id: string): Promise<LostItem> => {
  const { data } = await api.get<ApiResponse<LostItem>>(`/items/${id}`);
  if (!data.ok) throw new Error(data.message);
  return data.data!;
};

export const createItem = async (input: LostItemInput): Promise<LostItem> => {
  const { data } = await api.post<ApiResponse<LostItem>>('/items', input);
  if (!data.ok) throw new Error(data.message);
  return data.data!;
};

export const updateItem = async (id: string, input: Partial<LostItemInput>): Promise<LostItem> => {
  const { data } = await api.put<ApiResponse<LostItem>>(`/items/${id}`, input);
  if (!data.ok) throw new Error(data.message);
  return data.data!;
};

export const deleteItem = async (id: string): Promise<void> => {
  const { data } = await api.delete<ApiResponse>(`/items/${id}`);
  if (!data.ok) throw new Error(data.message);
};
