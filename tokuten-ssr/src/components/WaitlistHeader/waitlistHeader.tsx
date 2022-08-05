import React from "react";
import Newlogo from "../../assets/images/new_landing/header-logo.png";
import { useHistory } from "react-router-dom";
import "./waitlistHeader.scss";

interface IProps {
  isNext?: boolean;
  enableNext?: any;
}

export const WaitlistHeader: React.FC<IProps> = ({ isNext, enableNext }) => {
  const history = useHistory();
  return (
    <div className="">
      <div className="top-header top_new  pt-4 pb-3 mb-4">
        <div className="inner-head text-md-center">
          <img src={Newlogo} className="ml-3" alt="img" onClick={() => history.push('/')} />
          {isNext && (
            <button
              className="next_text btn text-primary d-md-none"
              onClick={enableNext}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* <img src={Newlogo1} className="ml-3 inner-head" alt="" />
        {isNext && (
          <button className="next_text btn text-primary" onClick={enableNext}>
            Next
          </button>
        )} */}
    </div>
  );
};
