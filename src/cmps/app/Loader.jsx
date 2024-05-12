import { useState } from "react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export function Loader() {
  let [loading ] = useState(true);
  let [color ] = useState("#FF385C");

  return (
    <div className="BeatLoader main-loader page main">
      <BeatLoader color={color} loading={loading} css={override} size={20} />
    </div>
  );
}
