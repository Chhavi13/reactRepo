import React, { ChangeEvent, FormEvent, useState } from "react";
import { WaitlistHeader } from "../../components/WaitlistHeader/waitlistHeader";
import * as alertService from "../../services/AlertService";
import TextField from "@material-ui/core/TextField";
import Pocket from "../../assets/images/login/red-pocket.png";
import Cartoon from "../../assets/images/login/ox.png";
import Welcome from "../../assets/images/login/welcome.png";

import "./screen-three.scss";
import { unlockAccess } from "../../services/auth.service";
import { useHistory, useLocation } from "react-router";

interface IProps { }

class CouponVM {
  coupon: any;
  user: any;
}

export const ScreenThree: React.FC<IProps> = () => {
  const history = useHistory();
  const location: any = useLocation();
  const { id, wait_list_count } = location.state;
  console.log(id)

  const [couponForm, setCouponForm] = useState<CouponVM>({
    coupon: "",
    user: id
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCouponForm({ ...couponForm, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: any = await unlockAccess(couponForm);
      if (response?.data?.success) {
        history.push('/login');
      } else {
        alertService.error(response?.response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-pageform signup_3 login_sign_section">
      <img
        src={Pocket}
        className="sign3_left_img1 d-lg-block d-none"
        alt="img"
      />
      <img
        src={Cartoon}
        className="sign3_right_img2 d-lg-block d-none"
        alt="img"
      />

      <div className="content-div new_login">
        <WaitlistHeader />

        <div className="form_body pt-0">
          <div className="available-items">
            <h1 className="third-screen">
              Welcome to Tokuten. <br /> You are #{wait_list_count} on our waitlist
            </h1>

            <img src={Welcome} alt="img" />

            <div className="vip_code">
              <p>Have a VIP Code? Join today</p>
            </div>

            <form onSubmit={onSubmit}>

              <TextField
                label="Enter VIP Code"
                variant="outlined"
                className="w-100 user-inputfeild mt-2"
                name="coupon"
                value={couponForm.coupon}
                onChange={(e: any) => { onChange(e) }}
              />

              <button
                type="submit"
                className={`login_btn mt-4 mb-3 ${!couponForm.coupon && 'disable_btn'}`}
                disabled={!couponForm.coupon && true}>
                <span>unlock access</span>
              </button>

              {/* <span onClick={() => history.push('/login')}>Login ?</span> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
