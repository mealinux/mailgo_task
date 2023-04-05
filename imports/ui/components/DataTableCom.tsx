import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

import DataTable from "react-data-table-component";

import { FaTrashAlt, FaEdit, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TextEnum } from "../constants/TextEnum";
import OutlineButtonCom from "./OutlineButtonCom";
import { ColorsEnum } from "../constants/ColorsEnum";

const columns = [
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Director",
    selector: (row: any) => row.year,
    sortable: true,
  },
  {
    name: "Year",
    selector: () => "Ghostbusters",
  },
  {
    name: "Actions",
    selector: (row: any) => row.action,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    action: (
      <Flex gap={4}>
        <OutlineButtonCom
          text={"Edit"}
          icon={<FaEdit />}
          customClickColor={ColorsEnum.LIGHTEST_PURPLE}
          customContentColor={ColorsEnum.BLUE}
        />
        <OutlineButtonCom
          icon={<FaTrashAlt />}
          customClickColor={ColorsEnum.LIGHTEST_PURPLE}
          customContentColor={ColorsEnum.RED}
        />
      </Flex>
    ),
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    action: (
      <Flex gap={4}>
        <OutlineButtonCom
          text={"Edit"}
          icon={<FaEdit />}
          customClickColor={ColorsEnum.LIGHTEST_PURPLE}
          customContentColor={ColorsEnum.BLUE}
        />
        <OutlineButtonCom
          icon={<FaTrashAlt />}
          customClickColor={ColorsEnum.LIGHTEST_PURPLE}
          customContentColor={ColorsEnum.RED}
        />
      </Flex>
    ),
  },
  {
    id: 3,
    title: "Ghostbusters",
    year: "1984",
    action: (
      <Flex gap={4}>
        <OutlineButtonCom
          text={"Edit"}
          icon={<FaEdit />}
          customClickColor={ColorsEnum.LIGHTEST_PURPLE}
          customContentColor={ColorsEnum.BLUE}
        />
        <OutlineButtonCom
          icon={<FaTrashAlt />}
          customClickColor={ColorsEnum.LIGHTEST_PURPLE}
          customContentColor={ColorsEnum.RED}
        />
      </Flex>
    ),
  },
];

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

const DataTableCom = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={false}
      progressComponent={<Spinner size="xl" />}
      pagination
      paginationComponentOptions={{ noRowsPerPage: true }}
      paginationIconNext={<FaArrowRight />}
      paginationIconPrevious={<FaArrowLeft />}
      paginationPerPage={4}
      responsive={true}
      customStyles={customStyles}
    />
  );
};

export default DataTableCom;
