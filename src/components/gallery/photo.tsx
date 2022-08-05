import React from "react";

const imgWithClick: any = { cursor: "pointer" };
interface IProps {}
const Photo = ({ index, onClick, photo, margin, direction, top, left }: any) => {

  const imgStyle: any = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = (event: any) => {
    onClick(event, { photo, index });
  };

  return (
    <img
      style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
      {...photo}
      onClick={onClick ? handleClick : null}
      alt="img"
    />
  );
};
export default Photo;