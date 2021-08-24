import React, { createRef } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
const csv = require("csvtojson");

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};
const modifyFile = (file) => {
  let formattedCSVtoJSON;
  let validData = [];
  let invalidDataMsg = [];
  Papa.parse(file[0], {
    complete: function (results) {
      // console.log("Finished:", results.data);
      results.data.splice(0, 1);
      results.data.splice(results.data.length-1, 1);
      formattedCSVtoJSON = results.data.map((item) => ({
        firstName: item[0],
        secondName: item[1],
        email: item[2],
      }));
      formattedCSVtoJSON.forEach((element) => {
        //  name error
        let error = [];
        if (!element?.firstName.match(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)) {
          //  result.push({message: `${element?.firstName} has to be a name`})
          error = [...error, `first name`];
        }
        if (!element?.secondName.match(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)) {
          //  result.push({message: `${element?.secondName} has to be a name`})
          error = [...error, `second name`];
        }
        if (
          !element?.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          // result.push({message: element?.email })
          error = [...error, `email`];
        }
        if (error.length > 0) {
          error = `Row no ${formattedCSVtoJSON.indexOf(element) + 1} has ${
            error.length > 1 ? "errors" : "error"
          } on ${error.join(", ")}.`;
          invalidDataMsg.push(error);
        } else {
          validData.push(element);
        }
      });
      console.log({validData, invalidDataMsg });
    },
  });
  
};
const DragCsvUpload = (props) => {
  return (
    <Dropzone
      accept={".csv"}
      onDropAccepted={(acceptedFiles) => modifyFile(acceptedFiles)}
      onDropRejected={(rejectedFiles) => console.log("rejected", rejectedFiles)}
      maxFiles={0}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps({ style: baseStyle })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop csv files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default DragCsvUpload;
