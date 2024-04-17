export type ApiResponse<TData = any> = {
  errors: string[];
  message: string;
  succeeded: boolean;
  data: TData;
};

export type PageDataResponse<TRows = any> = {
  content: TRows[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
};

export type PageResponse<TRows = any> = ApiResponse<PageDataResponse<TRows>>;

export type PageRequestBody = {
  pageNumber?: number;
  pageSize?: number;
  orderField?: string;
  orderSort?: string;
};

export interface HttpResponse {
  //TODO Cambiar esta interface masivamente
  errors: string[];
  message: string;
  succeeded: boolean;
}

export interface HttpResponse2<T = any> {
  errors: string[];
  message: string;
  succeeded: boolean;
  data: T;
}

export interface HttpDataResponse {
  //TODO Cambiar esta interface masivamente
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface HttpPageResponse<T = any>
  extends HttpResponse2<{
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
  }> {}

export interface HttpPageRequestBody {
  pageNumber?: number;
  pageSize?: number;
  orderField?: string;
  orderSort?: string;
}

