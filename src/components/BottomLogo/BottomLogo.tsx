import React, { ReactElement } from "react";
import "./BottomLogo.scss";
import BottomImg from "./assets/BottomImg.svg";

const BottomLogo: React.FC = (): ReactElement => {
  return (
    <div className="bottom-logo">
      <img src={BottomImg} alt="Background Sam Solutions Logo" />
    </div>
  );
};

export default BottomLogo;
