import type { ReactNode, ChangeEvent } from "react";
/** Table */
export type TableRow = {
  id: string;
  [key: string]: ReactNode;
};

export type TableProps = {
  title: string[];
  data: TableRow[];
};
/* SelectBox */
export type SelectBoxProps = {
  option: string[];
  label?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};