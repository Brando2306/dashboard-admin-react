import { IconType } from './icons.interface';

export type MenuActionType = 'inactive' | 'active' | 'detail' | 'edit' | 'delete';
export interface MenuAction {
  label: string;
  icon: IconType;
  class?: string;
  show?: boolean;
  isLink?: boolean;
  link?: string;
  style?: string;
  clickAction: () => void;
}

export interface CellMenuAction <TRow = any>{
  label?: string;
  icon?: IconType;
  class?: string;
  style?: string;
  show?: boolean | ((rowData: TRow, rowIndex: number) => boolean);
  isLink?: boolean;
  link?: string | any[] | ((rowData: TRow, rowIndex: number) => string | any[]);
  type?: MenuActionType;
  clickAction?: (rowData: TRow, rowIndex: number) => void;
}

export type CellMenuType = {
  [K in MenuActionType]: Partial<CellMenuAction>;
};