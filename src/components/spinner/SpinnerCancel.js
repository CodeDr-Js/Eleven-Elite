// Spinner.js
import React from "react";
import { css } from "@emotion/react";
import { ScaleLoader,MoonLoader,FadeLoader} from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = ({spinnerID}) => {
  return (
    <div className="sweet-loading d-none">
      <ScaleLoader color={"#36D7B7"} css={override} size={150} isloading={true} />
    </div>
  );
};

export default Spinner;
