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
  Papa.parse(file[0], {
    complete: function (results) {
      // console.log("Finished:", results.data);
      results.data.splice(0, 1);
      results.data.splice(results.data.length, 1);
      formattedCSVtoJSON = results.data.map((item) => ({
        firstName: item[0],
        secondName: item[1],
        email: item[2],
      }));
      // csv()
      //   .fromFile(results.data)
      //   .then((jsonObj) => {
      //     formattedCSVtoJSON = jsonObj.map((item) =>
      //       Object.assign({
      //         firstName: Object.entries(item)[0][1],
      //         secondName: Object.entries(item)[1][1],
      //         email: Object.entries(item)[2][1],
      //         ...item,
      //       })
      //     );
      //   });
      console.log(formattedCSVtoJSON);
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
