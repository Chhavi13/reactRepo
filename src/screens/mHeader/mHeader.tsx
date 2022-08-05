import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import * as images from "../images";
import "./mHeader.css";

const DashboardHeader = ({ addIcon, setCreateChannelModal }: any) => {
  return (
    <div className="mobheader text-center">
      <img src={images.mainLogo} alt="logo" />
      {addIcon && (
        <div
          className="add-group-icon"
          onClick={() => setCreateChannelModal(true)}
        >
          <AddCircleOutlineOutlinedIcon />
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
