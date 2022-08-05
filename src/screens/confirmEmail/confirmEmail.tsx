import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import "./confirmEmail.scss";
import Newlogo1 from "../../assets/images/new_landing/robot_head.png";
import { Spinner } from "react-bootstrap";
import * as alertService from "../../services/AlertService";
import * as authService from "../../services/auth.service";
import left from "../../assets/images/login/1.png";
import right from "../../assets/images/login/2.png";

interface IProps {
  onPageChange: any;
  setIsToggleSidebar?: any;
  isToggleSidebar?: any;
}

export const ConfirmEmail: React.FC<IProps> = ({
  onPageChange,
  setIsToggleSidebar,
  isToggleSidebar
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  let history: any = useHistory();

  const useQuery = () => {
    return new URLSearchParams(window.location.search);
  };
  const query = useQuery();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      token: query.get("token")
    };
    setIsSubmitting(true);
    try {
      let response: any = await authService.confirmEmail(payload);
      //let data = response?.payload;

      if (response.status === 201) {
        // console.log(response)
        // alertService.success(response.data.message)
        setIsSubmitting(false);
        history.push("/");
      } else {
        alertService.error(response.data.message);
      }
      setIsSubmitting(false);
    } catch (err: any) {
      setIsSubmitting(false);
      if (err.response) {
        if (err.response.data) {
          alertService.error(err.response.data.detail);
        }
      } else {
        alertService.error(err.message);
      }
    }
  };

  return (
    <div>
      <div className="login-pageform login_sign_section">
        <img
          src={left}
          className="login_left_img d-lg-block d-none"
          alt="Image"
        />
        <img
          src={right}
          className="login_right_img d-lg-block d-none"
          alt="Image"
        />
        <div className="content-div new_login text-center">
          <div className="top-header top_new pt-4 pb-3 mb-4">
            <div className="inner-head">
              <img src={Newlogo1} className="ml-3" alt="" />
            </div>
          </div>

          <div className="content-bg set">
            <h3>
              Loyal Fans,
              <br />
              Royal Treatment
            </h3>
            <p className="support-text">
              Support creators.
              <br />
              Get recognition. Be rewarded.
            </p>
          </div>
          <div className="form_body">
            <form className="confirm-mail" onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`login_btn  ${isSubmitting ? "add-opacity" : ""}`}
              >
                {isSubmitting ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <span>Confirm Email</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
