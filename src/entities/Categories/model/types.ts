export interface CategoryListDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface GetCategoriesListRequest {
  search?: string;
  limit?: number;
  page?: number;
}

export interface GetCategoriesListResponse {
  count: number;
  pages: number;
  page: number;
  limit: number;
  results: CategoryListDto[];
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface DeleteCategoryResponse {
  message: string;
}
