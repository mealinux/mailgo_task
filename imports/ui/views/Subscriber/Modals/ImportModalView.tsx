import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Alert,
  AlertIcon,
  Center,
  Divider,
  Flex,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

import ModalUtil from "../../../utils/ModalUtil";
import { FaFileImport } from "react-icons/fa";
import { Meteor } from "meteor/meteor";

import * as XLSX from "xlsx";
import { ColorsEnum } from "/imports/ui/constants/ColorsEnum";

const ImportModalView = (props: {
  progressBar: boolean;
  setProgressBar: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  handleChangeDataTable: VoidFunction;
}) => {
  const fileReader = new FileReader();

  const [importModalIsOpen, setImportModalIsOpen] = useState<boolean>();

  const [importFileAlertMessage, setImportFileAlertMessage] =
    useState<boolean>();

  const [importFile, setImportFile] = useState<any>();
  /* 
  -----------------------------------------------------
  start onHandleFile file function
  -----------------------------------------------------
  */
  const onHandleFile = async () => {
    const fileExtension = importFile!.name.split(".").pop();
    let fileOutput;

    if (importFile) {
      fileReader.onload = async (event: any) => {
        fileOutput = event.target.result;

        if (fileExtension != "csv") {
          fileOutput = XLSX.read(fileOutput);
        }

        await Meteor.callAsync("import-file", fileExtension, fileOutput)
          .then(() => {
            setImportFileAlertMessage(true);
            props.handleChangeDataTable();
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            props.setProgressBar(false);
          });
      };

      if (fileExtension == "csv") {
        fileReader.readAsText(importFile);
      } else {
        fileReader.readAsArrayBuffer(importFile);
      }
    }
  };
  /* 
  -----------------------------------------------------
  end onHandleFile file function
  -----------------------------------------------------
  */

  const onModalClose = () => {
    setImportModalIsOpen(false);
    setImportFileAlertMessage(false);
    props.onClose();
  };

  return (
    <ModalUtil
      isOpen={props.isOpen}
      onClose={() => onModalClose()}
      title={"Import File"}
      icon={<FaFileImport />}
      buttonText={"Import"}
      onClickAdd={() => {
        props.setProgressBar(true);
        onHandleFile();
      }}
    >
      <Flex flexDirection={"column"}>
        <Flex mb={3}>
          {importFileAlertMessage ? (
            <Alert status="success" height={10}>
              <AlertIcon />
              File uploaded to the database.
            </Alert>
          ) : (
            <div></div>
          )}
        </Flex>
        <Flex mb={3}>
          <Alert status="warning">
            <AlertIcon />
            <Flex flexDirection={"column"}>
              <Text fontSize={10}>
                For .csv file, design pattern is seperated with comma in for
                each row, like this İsmayil,Kılıç,ismayil@gmail.com
              </Text>
              <Divider h={0.5} bgColor={ColorsEnum.LIGHT_GREY} mb={2} mt={2} />
              <Text fontSize={10}>
                For .xslx or .xls file (Excel), design pattern is A1
                column=name, B1 column=last name and C1 column=email in for each
                row
              </Text>
            </Flex>
          </Alert>
        </Flex>
        <Flex>
          {props.progressBar ? (
            <Center>
              <Spinner size={"md"}></Spinner>
            </Center>
          ) : (
            <></>
          )}
          <Input
            type="file"
            accept=".csv, .xls, .xlsx"
            size={"sm"}
            disabled={props.progressBar}
            onChange={(e: any) => {
              setImportFile(e.target.files[0]);
            }}
          />
        </Flex>
      </Flex>
    </ModalUtil>
  );
};

export default ImportModalView;
