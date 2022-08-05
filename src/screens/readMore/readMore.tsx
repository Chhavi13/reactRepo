import React, { useState } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import "./readMore.css";
import { PassionContext } from "../mUserProfile/mUserProfile";

interface IProps { }

export const ReadMore: React.FC<IProps> = ({ children }) => {
  let profileDataRedux = useSelector((state: any) => {
    return state.authReducer?.personalData
  })
  const text: any = children;
  const [isReadMore, setIsReadMore] = useState<boolean>(true);
  const isPassActive = useContext(PassionContext)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
    isPassActive.enableActive()
  };

  return (
    <>

      {isReadMore ? text?.slice(0, 100) : text}

      <span onClick={toggleReadMore} className={`read-more-less ${isPassActive.isActive && "mt-5 pt-3"}`}>
        {text?.length > 100 && ((isReadMore || profileDataRedux?.passions) ? "...See more" : "See less")}
      </span>
    </>
  );
};