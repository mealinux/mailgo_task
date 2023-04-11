import React, { ReactElement, useEffect, useState } from "react";
import Main from "../../Main";
import { Center, Flex, Input, Spinner, useDisclosure } from "@chakra-ui/react";
import DataTableCom from "../../components/DataTableCom/DataTableCom";

import { FaPlus, FaUndoAlt, FaTimes, FaFilter } from "react-icons/fa";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Meteor } from "meteor/meteor";
import { DataTableEnum } from "../../constants/DataTableEnum";
import { DataColumns } from "./data/DataColumns";
import { ActionEnum } from "../../constants/ActionEnum";
import ModalView from "./ModalView";
import { useModal } from "/imports/context/UtilContext";
import CategoryModel from "/imports/models/CategoryModel";
import { CategoriesData } from "./data/CategoriesData";

const CategoriesView = (props: { title: string }) => {
  const { setProgressBar } = useModal();

  const { isOpen, onOpen, onClose } = useDisclosure();

  //for modal
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>(
    {} as CategoryModel
  );

  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const [modalIcon, setModalIcon] = useState(<FaPlus />);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //---------------

  const [actionType, setActionType] = useState(ActionEnum.ADD);

  const [showFilter, setShowFilter] = useState(false);

  const [filterDateRange, setFilterDateRange] = useState([]);

  const [filterText, setFilterText] = useState("");

  const [dataOffset, setDataOffset] = useState(0);

  const [categoryData, setCategoryData] = useState<{
    categories: { category: CategoryModel; columns: ReactElement };
    totalCount: number;
  }>();

  useEffect(() => {
    setProgressBar(false);
    handleChangeDataTable();
  }, []);

  const handleChangeDataTable = (
    offset: number = 0,
    dateRange: Array<Date> = [],
    text: string = ""
  ) => {
    Meteor.callAsync("get-categories", offset, {
      dateRange,
      text,
      limit: true,
    })
      .then((data: { data: Array<CategoryModel>; totalCount: number }) => {
        const dataAll = CategoriesData({
          data: data.data,
          totalCount: data.totalCount,
          onOpen,
          handleChangeDataTable,
          setModalTitle,
          setModalButtonText,
          setModalIcon,
          setName,
          setDescription,
          setActionType,
          setSelectedCategory,
        });

        setCategoryData(dataAll);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setProgressBar(false));
  };

  return (
    <Main style={{ width: "80%" }} title={props.title}>
      <ModalView
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        handleChangeDataTable={handleChangeDataTable}
        actionType={actionType}
        name={name}
        description={description}
        modalTitle={modalTitle}
        modalButtonText={modalButtonText}
        modalIcon={modalIcon}
        setName={setName}
        setDescription={setDescription}
        selectedCategory={selectedCategory}
      />
      <Flex flexDirection={"column"} padding={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} mb={10}>
          <Flex mb={4}>
            {showFilter ? (
              <DateRangePicker
                value={filterDateRange}
                format={"dd/MM/y"}
                clearIcon={<FaTimes />}
                onChange={(date: any) => {
                  setFilterDateRange(date);

                  handleChangeDataTable(dataOffset, date);

                  setProgressBar(true);
                }}
              />
            ) : (
              <div></div>
            )}
          </Flex>

          <Flex justifyContent={"end"} gap={4}>
            <Input
              placeholder="Search"
              size="sm"
              htmlSize={20}
              mb={4}
              width={"auto"}
              bg={ColorsEnum.WHITE}
              borderColor={ColorsEnum.LIGHT_GREY}
              onChange={(event) => {
                if (event.target.value.length > 2) {
                  setFilterText(event.target.value);
                  setShowFilter(false);
                  handleChangeDataTable(
                    dataOffset,
                    filterDateRange,
                    event.target.value
                  );
                } else {
                  setFilterText("");
                  handleChangeDataTable();
                }
              }}
            />
            <OutlineButtonCom
              text={"Filter"}
              icon={<FaFilter />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={
                showFilter ? ColorsEnum.BLACK : ColorsEnum.GREY
              }
              onClick={() => {
                if (showFilter) {
                  setShowFilter(false);
                  handleChangeDataTable();
                  setFilterDateRange([]);
                } else {
                  setShowFilter(true);
                }
              }}
            />
            <OutlineButtonCom
              onClick={() => {
                setModalTitle("Add New A Category");
                setModalButtonText("ADD");
                setModalIcon(<FaPlus />);

                setActionType(ActionEnum.ADD);

                setName("");
                setDescription("");

                onOpen();
              }}
              text={"New"}
              icon={<FaPlus />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.DARKEST_PURPLE}
            />
          </Flex>
        </Flex>
        {categoryData ? (
          <DataTableCom
            data={categoryData.categories}
            totalCount={categoryData.totalCount}
            columns={DataColumns()}
            onChangePage={(page, totalRows) => {
              const offset = (page - 1) * DataTableEnum.LIMIT;

              setDataOffset(offset);

              handleChangeDataTable(offset, filterDateRange, filterText);
            }}
          />
        ) : (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}
      </Flex>
    </Main>
  );
};
export default CategoriesView;
