export interface Item {
  id: string;
  content: string;
}

export interface Columns {
  [prop: string]: Item[];
}

export type ColumnIdType = 'column1' | 'column2' | 'column3' | 'column4';
