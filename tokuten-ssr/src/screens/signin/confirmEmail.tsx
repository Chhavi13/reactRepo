import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./signin.css";
import * as authService from '../../services/auth.service';
import * as alertService from "../../services/AlertService"
export const ConfirmEmail = ({ isBuyNow = true }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  let history = useHistory()
  const useQuery = () => {
    return new URLSearchParams(window.location.search);
  }
  const query = useQuery();
  console.log("Email token", query.get("token"))
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const payload = {
        auth_token: query.get("token"),
      }
      setIsSubmitting(true)
      let response: any = await authService.confirmEmail(payload);
      console.log(response)
      if (response) {
        if (response.status === 200) {
          setIsSubmitting(false)

          // alertService.success(response.data.message);
          //alertService.success("response?.data?.message");
        }
      }

    }
    catch (error: any) {
      setIsSubmitting(false)
      if (error.response) {
        if (error.response.data) {

          // swal({
          //     title: "Error",
          //     text: error.response.data.message,
          //     icon: "error",
          // });
          console.log("asdf", error.response.data.message)
          alertService.error(error.response.data.message)
        }
      }
    }
  }
  return (
    <div className="mobilemaincontainer">
      <div className={`${isBuyNow ? 'mobile_container signupmobcontainer' : 'buy-now-page-tabs'}`}>
        <div className="sabrinamainscroll">

          <div>

            <div className={` buy-now-page`}>
              <button type='submit' onClick={handleSubmit}>
                <span>Confirm Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}