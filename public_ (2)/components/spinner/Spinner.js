// Spinner.js
import React from "react";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  return (
    <div className="sweet-loading d-flex justify-content-center align-items-center">
      <ScaleLoader color={"#36D7B7"} css={override} size={150} loading={true} />
    </div>
  );
};

export default Spinner;
