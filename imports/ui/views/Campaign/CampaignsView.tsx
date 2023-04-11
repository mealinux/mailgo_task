import React, { ReactElement, useEffect, useState } from "react";
import Main from "../../Main";
import {
  Center,
  Flex,
  Input,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import DataTableCom from "../../components/DataTableCom/DataTableCom";

import { FaPlus, FaTimes, FaFilter } from "react-icons/fa";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Meteor } from "meteor/meteor";
import { DataTableEnum } from "../../constants/DataTableEnum";
import { DataColumns } from "./data/DataColumns";
import { ActionEnum } from "../../constants/ActionEnum";
import ModalView from "./ModalView";
import { useModal } from "/imports/context/UtilContext";
import { CampaignsData } from "./data/CampaignsData";
import CampaignModel from "/imports/models/CampaignModel";
import CategoryModel from "/imports/models/CategoryModel";

const CampaignsView = (props: { title: string }) => {
  const { setProgressBar } = useModal();

  const { isOpen, onOpen, onClose } = useDisclosure();

  //for modal
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignModel>(
    {} as CampaignModel
  );

  const [modalTitle, setModalTitle] = useState("");
  const [modalButtonText, setModalButtonText] = useState("");
  const [modalIcon, setModalIcon] = useState(<FaPlus />);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  //---------------

  const [categories, setCategories] = useState<any>();

  const [actionType, setActionType] = useState(ActionEnum.ADD);

  const [showFilter, setShowFilter] = useState(false);

  const [filterDateRange, setFilterDateRange] = useState([]);

  const [filterText, setFilterText] = useState("");

  const [dataOffset, setDataOffset] = useState(0);

  const [campaignData, setCampaignData] = useState<{
    campaigns: { campaign: CampaignModel; columns: ReactElement };
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
    Meteor.callAsync("get-campaigns", offset, {
      dateRange,
      text,
    })
      .then(
        (data: {
          campaigns: { data: Array<CampaignModel>; totalCount: number };
          categories: { data: Array<CategoryModel>; totalCount: number };
        }) => {
          const dataAll = CampaignsData({
            data: data.campaigns.data,
            totalCount: data.campaigns.totalCount,
            onOpen,
            handleChangeDataTable,
            setModalTitle,
            setModalButtonText,
            setModalIcon,
            setName,
            setDescription,
            setTarget,
            setActionType,
            setSelectedCampaign,
          });

          setCategories(data.categories.data);
          setCampaignData(dataAll);
        }
      )
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
        target={target}
        modalTitle={modalTitle}
        modalButtonText={modalButtonText}
        modalIcon={modalIcon}
        setName={setName}
        setDescription={setDescription}
        setTarget={setTarget}
        selectedCampaign={selectedCampaign}
        categories={categories}
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
                setModalTitle("Add New A Campaign");
                setModalButtonText("ADD");
                setModalIcon(<FaPlus />);

                setActionType(ActionEnum.ADD);

                setName("");
                setDescription("");
                setTarget("");

                onOpen();
              }}
              text={"New"}
              icon={<FaPlus />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.DARKEST_PURPLE}
            />
          </Flex>
        </Flex>
        {campaignData ? (
          <DataTableCom
            data={campaignData.campaigns}
            totalCount={campaignData.totalCount}
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
export default CampaignsView;
