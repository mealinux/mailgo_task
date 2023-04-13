import React from "react";
import {
  Alert,
  AlertIcon,
  Center,
  Flex,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";

import ModalUtil from "../../../utils/ModalUtil";
import { useSubscriberState } from "/imports/States/SubsribersState";
import { FaFileImport } from "react-icons/fa";
import { Meteor } from "meteor/meteor";
import { useUtilState } from "/imports/States/UtilState";
import * as XLSX from "xlsx";

const ImportModalView = (props: { handleChangeDataTable: VoidFunction }) => {
  const fileReader = new FileReader();

  const progressBar = useUtilState((state: any) => state.progressBar);

  const setProgressBar = useUtilState((state: any) => state.setProgressBar);

  const importModalIsOpen = useSubscriberState(
    (state: any) => state.importModalIsOpen
  );
  const setImportModalIsOpen = useSubscriberState(
    (state: any) => state.setImportModalIsOpen
  );

  const setImportFileAlertMessage = useSubscriberState(
    (state: any) => state.setImportFileAlertMessage
  );

  const importFileAlertMessage = useSubscriberState(
    (state: any) => state.importFileAlertMessage
  );

  const importFile = useSubscriberState((state: any) => state.importFile);
  const setImportFile = useSubscriberState((state: any) => state.setImportFile);

  /* 
  -----------------------------------------------------
  start onHandleFile file function
  -----------------------------------------------------
  */
  const onHandleFile = async () => {
    const fileExtension = importFile.name.split(".").pop();
    let fileOutput;

    if (importFile) {
      fileReader.onload = async (event: any) => {
        fileOutput = event.target.result;

        if (fileExtension != "csv") {
          fileOutput = XLSX.read(fileOutput);
          console.log(fileOutput.Sheets.Sheet1);
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
            setProgressBar(false);
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
  };

  return (
    <ModalUtil
      isOpen={importModalIsOpen}
      onClose={() => onModalClose()}
      title={"Import File"}
      icon={<FaFileImport />}
      buttonText={"Import"}
      onClickAdd={() => {
        setProgressBar(true);
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
          <Text fontSize={10}>
            <Alert status="warning">
              <AlertIcon />
              For .csv file, disagn pattern is seperated with comma in for each
              row, like this İsmayil,Kılıç,ismayil@gmail.com
              <br />
              ------------------------------------------------------------------
              <br />
              For .xslx or .xls file (Excel), disagn pattern is A1 column=name,
              B1 column=last name and C1 column=email in for each row
            </Alert>
          </Text>
        </Flex>
        <Flex>
          {progressBar ? (
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
            disabled={progressBar}
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
