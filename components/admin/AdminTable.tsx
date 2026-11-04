import { Table } from "../ui/table/Table";
import { Pagination } from "../ui/Pagination";
import type { TableRow } from "@/types/pagination";

interface Props {
  title: string[];
  data: TableRow[];
  itemsPerPage?: number;
  maxPageButtons?: number;
  totalRecords?: number;
}

export const AdminTable = ({
  title,
  data,
  itemsPerPage = 8,
  maxPageButtons = 3,
  totalRecords,
}: Props) => {
  return (
    <Pagination
      itemsPerPage={itemsPerPage}
      maxPageButtons={maxPageButtons}
      data={data}
      totalRecords={totalRecords}
    >
      {(currentData) => <Table title={title} data={currentData} />}
    </Pagination>
  );
};