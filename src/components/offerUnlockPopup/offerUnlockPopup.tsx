import React, { useState } from 'react';
import User from "../../assets/images/mobileimages/user2.svg";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


import "./offerUnlockPopup.scss"
import { useHistory } from 'react-router';

interface IProps {
  offerId: number;
}
export const OfferUnlockPopup: React.FC<IProps> = ({ offerId }) => {
  const history = useHistory();
  const [checked, setChacked] = useState<boolean>()
  const handleChange = () => {

  }

  return (
    <div className="unlock_modal">
      <div className="modal_header">
        <img src={User} alt="Image" />
      </div>

      <div className="modal_body">
        <h1>
          Unlock this for

        </h1>
        <h2>
          <sup>$</sup>7.00
        </h2>

        <div className="mt-4">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="I have read the Terms & Conditions set by the creator"
          />

          <Button
            variant="contained"
            color="primary"
            className="mb-4 mt-3"
            onClick={() => history.push(`/offer/comment/${offerId}`)}>
            unlock
          </Button>
        </div>
      </div>
    </div>
  )
}
