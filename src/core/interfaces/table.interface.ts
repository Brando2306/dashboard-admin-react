
export interface TableWrapper {
  [key: string]: any;
}

export interface TableRow {}

export interface TableColumn {
  label?: string;
  property?: string;
  type: string;
}

export interface Table {
  columns?: TableColumn[];
  row?: TableRow[];
}

export interface Paginator<TRows = any> {
  items: TRows[];
  totalItems?: number;
  currentPage: number;
  totalPages?: number;
  orderField?: string;
  orderSort?: string;
  pageSize?: number;
}

export type BasePageQueryParams = {
  currentPage: number;
  orderField?: string;
  orderSort?: string;
  pageSize?: number;
};

export interface DetailPaginator extends Paginator {
  id?: number;
}

export type CustomTableColumns<TRow = any> = CustomTableColumn<TRow>[];

export interface CustomTableColumn<TRow = any, TValue = any> {
  headerName?: string;
  field?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  cellRendererParams?: any;
  valueFormatter?: ValueFormatterFunc<TRow, TValue>;
}

export interface ValueFormatterFunc<TRow = any, TValue = any> {
  (params: {
    value: TValue | null | undefined;
    row: TRow | undefined;
    column: CustomTableColumn;
    index: number;
  }): string;
}
