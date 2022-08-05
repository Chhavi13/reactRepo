import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import * as twilioService from '../../services/twilio.service';
import Close from "../../assets/images/mobileimages/cancel1.png";
import Camera from "../../assets/images/mobileimages/camera.png";
import Plus from "../../assets/images/mobileimages/add.png";
import { getItemLocalStorage } from "../../utils/Utils";
interface IProps { }

export const CreateGroupNew = (props: any) => {
  const [name, setName] = useState<any>();
  const [image, setImage] = useState<any>();
  let userInfo: any = getItemLocalStorage("authData");
  userInfo = JSON.parse(userInfo);

  const valueChangeHandler = (event: any) => {
    setName(event);
  }

  const createNewGroup = async () => {
    const payload = {
      group_name: name,
      creator: userInfo.id,
    }
    twilioService.createGroup(payload).then(res => {
      setName('');
      props.updateGroupList(res?.data?.data);
      // props.setCreateChannelModal(false);
    });
  }

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  //file upload section
  const FileUpload = (e: any) => {
    // debugger
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function () {
      console.log(reader.result);//base64encoded string
      setImage(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };


    // setImage() 
  }
  //file upload section end 

  return (
    <div className="create-channel-modal">
      <div className="channel_header">
        <h1 className="pt-2 mb-0">create your community</h1>
        {/* <img src={Close} alt="Image" /> */}
      </div>

      <div className="channel_body">
        <form className="w-100" noValidate autoComplete="off">
          <p className="community_para mt-3">
            Give your community identity/name and an icon. <br /> You can always
            change it later.
          </p>
          <div className="form-group upload_content mt-4 mb-4">
            <div className="upload_img text-center">
              <div className="chat_image_upload"> 
              {image ? <img src={image} className="image_chat" alt="Image" />:
              <img src={Camera} className="mt-4 pt-2 mb-1" alt="Image" />}
              </div>
              <p>upload</p>

              <input type="file" name="file" id="file" onChange={FileUpload} className="input-file" />
              <label htmlFor="file" className="btn btn-tertiary js-labelFile">
                <img src={Plus} alt="User" />
                {/* <i className="icon fa fa-check"></i> */}
                {/* <span className="js-fileName"></span> */}
              </label>
            </div>
          </div>

          <TextField
            id="outlined-basic"
            label="Community Name"
            placeholder=""
            variant="outlined"
            className="mb-3"
            onChange={(event: any) => valueChangeHandler(event.target.value)}
          />
          <p className="community_para text-left">
            By creating a community, you agree to guidelines
          </p>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={`modal_btn mt-4 ${!name && "validate_btn"}`}
            disabled={!name && true}
            onClick={createNewGroup}>
            create
          </Button>
        </form>
      </div>
    </div>
  );
};
