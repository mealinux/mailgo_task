import React, { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

import DataTable from "react-data-table-component";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TextEnum } from "../../constants/TextEnum";
import { PaginationChangePage } from "react-data-table-component/dist/src/DataTable/types";
import { DataTableEnum } from "../../constants/DataTableEnum";
import { useModal } from "/imports/context/UtilContext";

const customStyles = {
  headCells: {
    style: {
      fontSize: TextEnum.SMALL_SIZE,
    },
  },
  cells: {
    style: {
      fontSize: TextEnum.TINY_SIZE,
    },
  },
};

const DataTableCom = (props: {
  onChangePage: PaginationChangePage;
  data: any;
  totalCount: number;
  columns: Array<Object>;
}) => {
  const { progressBar, setProgressBar } = useModal();

  useEffect(() => {
    setProgressBar(false);
  }, []);

  return (
    <DataTable
      columns={props.columns}
      data={props.data}
      progressPending={progressBar}
      progressComponent={<Spinner size="xl" />}
      paginationComponentOptions={{ noRowsPerPage: true }}
      paginationIconNext={<FaArrowRight />}
      paginationIconPrevious={<FaArrowLeft />}
      paginationTotalRows={props.totalCount!}
      paginationPerPage={DataTableEnum.LIMIT}
      paginationServer
      responsive
      pagination
      onChangePage={(page, totalRows) => props.onChangePage(page, totalRows)}
      customStyles={customStyles}
    />
  );
};

export default DataTableCom;
