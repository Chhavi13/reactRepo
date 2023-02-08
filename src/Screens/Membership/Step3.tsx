import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';
import listIcon from "../../Assets/img/login/membership-bullets.svg";
import parse from 'html-react-parser';
import CongratsModel from "./congratsModel";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export default function Step3({ setSubsDetail, handleNext, membershipPlan, isMembership }: any) {
  
  const [memberShip, setMembership] = useState<any>({})
  const [popup, setPopup] = useState<any>(false)
  let navigate = useNavigate()
  let membersipHandler = (res: any) => {
    
    if (res?.isSubscription === true) {
      setPopup(true)
      // setTimeout(() => {
        // setPopup(false)
      //   navigate("/")
      // }, 3000)
      return
    }
    
    setSubsDetail(res);
    handleNext();
  }

  useEffect(() => {
    if (isMembership?.company_code_status == 1) {
      setMembership(isMembership?.membership)
    }
  }, [isMembership])


  return (
    <div>
      
      <CongratsModel memberShip={memberShip} open={popup} setOpen={setPopup} />
      <div className="step-innercontent step_width_content step3 ">
        <div>
          <h3>Select <span className="strong">your membership</span></h3>
          <div className="row">
            <div className="col-md-8 offset-md-2 col-12">
              <p className="mb-5 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum faucibus arcu non eros porttitor, in malesuada lorem
                ullamcorper.
              </p>
            </div>
          </div>

          <div className="radio-area pb-2 pb-xl-3 pb-lg-5 main-membership">
            <div className="row">
              {membershipPlan.map((res: any, index: number) => (
                <div key={index} className="col-md-6 col-lg-4 col-sm-12 col-12 mb-3">
                  <div className={`member_plan monthy-plan red_member ${res?.class} `} style={{ border: `1px solid ${res?.color_code}` }}>
                    <div className="plan_head" style={{ backgroundColor: `${res?.color_code}` }}>
                      <h3>
                        <span className="plan-nm">
                          {res?.title}
                        </span>
                        Membership
                      </h3>
                      {/* <h4>
                        Monthly
                      </h4> */}
                    </div>

                    <div className="plan_content">
                      {/* <p>
                        Unlock full access to the Nurture by NAPS program. As a member, you attend webinars, live Q&As, special member events and more for free. Tap into our Ask a Nurse forum 24/7 for expert nursing advice on your parenting questions. Plus, log in any time to watch 100s of on-demand videos and download illustrated care guides. This subscription will renew every 6 months.
                      </p> */}
                      <div className="Plan-price-main d-flex flex-column">
                        {res?.percentage != 0 && <div className="plan-saving" style={{ color: `${res?.color_code}` }}>Save {res?.percentage}%</div>}
                        <div className="d-flex Plan-price">
                          {res?.base_price && <span className="pCost-old" >${res?.base_price}</span>}
                          <span className="pCost" >${res?.amount}</span>
                          <span className="membership-cycle" >/mo</span>
                        </div>
                        <div className="plan-price-Total">
                          <span className="strong">$ {res?.price_deduction && res?.price_deduction}  </span>  Every {res?.title} membership
                        </div>
                      </div>

                      <div className="plan-details-list">
                        <p className="strong">
                          {parse(String(res?.description))}
                          {/* This subscription renews every month. */}
                        </p>
                        {/* <ul className="monthly-dtls-list">
                        <li className="d-flex justify-content-start">
                          <div><img src={listIcon}/></div> 
                          <div> <p>Access to our members-only classes, Q & As, nursing forum and more!</p></div> 
                        </li>
                        <li className="d-flex justify-content-start">
                        <div><img src={listIcon}/></div>
                        <div> <p>Nursing forum</p></div>
                        </li>
                        <li className="d-flex justify-content-start">
                        <div><img src={listIcon}/></div>
                        <div><p>Special discounts on lactation and sleep consults. </p>
                        </div>
                        </li>
                      </ul> */}
                      </div>
                      {res.class !== "disable_member" && <button className="btn btn_trial" onClick={() => membersipHandler(res)} style={{ backgroundColor: `${res?.color_code}` }}>
                        {res?.isSubscription ? "Confirm" : "Start 7 Day Free Trial"}
                      </button>}
                    </div>

                  </div>
                </div>
              ))}


              {/* <div className="col-md-4 col-sm-6 col-12">
                <div className="member_plan purple_member">
                  <div className="plan_head">
                    <h3>
                      $245
                    </h3>
                    <h4>
                      3 months
                    </h4>
                  </div>

                  <div className="plan_content">
                    <p>
                      Unlock full access to the Nurture by NAPS program. As a member, you attend webinars, live Q&As, special member events and more for free. Tap into our Ask a Nurse forum 24/7 for expert nursing advice on your parenting questions. Plus, log in any time to watch 100s of on-demand videos and download illustrated care guides. This subscription will renew every 3 months.
                    </p>

                    <button className="btn btn_trial">
                      Start 7 Day Free Trial
                    </button>
                  </div>

                </div>
              </div> */}

              {/* <div className="col-md-4 col-sm-6 col-12">
                <div className="member_plan red_member">
                  <div className="plan_head">
                    <h3>
                      $485
                    </h3>
                    <h4>
                      6 months
                    </h4>
                  </div>

                  <div className="plan_content">
                    <p>
                      Monthly access to our members-only classes, Q&As, nursing forum and more! You will be charged $97 each month for access to our full membership program and all member perks. Enjoy special discounts on lactation and sleep consults. This subscription renews every month.
                    </p>

                    <button className="btn btn_trial">
                      Start 7 Day Free Trial
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

