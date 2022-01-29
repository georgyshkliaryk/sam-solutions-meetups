import React, { ReactElement } from "react";
import "./NoDataPlaceholder.scss";

interface IProps {
  text: string;
}

const NoDataPlaceholder: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className="nodata">
      <div className="nodata-image">
        <span className="material-icons-outlined nodata-image__icon">
          content_paste_off
        </span>
      </div>
      <p className="nodata-text">{props.text}</p>
    </div>
  );
};

export default NoDataPlaceholder;
