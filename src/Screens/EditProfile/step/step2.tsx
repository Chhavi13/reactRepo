import moment from 'moment'
import React, { useState } from 'react'
import master_card_img from '../../../Assets/img/master-card.png'
import visa_card_img from '../../../Assets/img/visa-card.png'
import parse from 'html-react-parser';
import { Link, useNavigate } from 'react-router-dom';
import { MEMBERSHIP } from '../../../Routes/RouteConstent';
import MembershipDetail from '../../../Common/membershipDetail/membershipDetail';
import ReceiptView from '../../../Common/TermConditionPopup/receiptView';

function Step2({ billingNo, userMember, memberData, payHistory, payDetail }: any) {
  console.log(payHistory)
  console.log(payDetail)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [data, setData] = useState<any>({})
  const [item,setItem] = useState<any>({})
  const [open,setOpen] = useState(false)
  const Navigator = useNavigate()
  
  const handelReceipt=(res:any)=>{
    setOpen(true)
    setItem(res)
  }
  const handleStepper = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className='col-lg-12 col-md-12 your-membership-main'>
            {
              userMember?.user_membership_status == 1 &&
              <div className='your-membership'>
                <h5 className='section-title'>Your Membership</h5>
                <div className='my-3 d-flex w-100 ur-membership-container py-3 justify-content-center'>
                  <p className='m-0 d-flex align-items-center'>You have {userMember?.title} Membership<span className='plan-price ms-1'> ${userMember?.amount} </span>/mo {userMember?.sub_title}</p>
                </div>
              </div>
            }


            <div className='upgrade-membership'>
              <h3 className='upgrade-msg mt-4 py-2'>Upgrade your membership <span className='strong'>and save up to 45%</span></h3>
              <div className='d-flex w-100 flex-column flex-md-row'>

                {
                  memberData.map((res: any, i: number) => (
                    <div className={`plan-option${i + 1} member_plan monthy-plan w-50 me-md-2 me-0 mb-3 mb-md-0`} style={{ border: `1px solid ${res?.color_code}` }}>
                      <div className="plan_head px-4 py-4" style={{ backgroundColor: `${res?.color_code}` }}>
                        <h3><span className="plan-nm">{res?.title} </span> Membership</h3>
                      </div>
                      <div className="plan_content px-4 py-4">
                        <div className="Plan-price-main d-flex flex-column">
                          {parseInt(res?.percentage) != 0 && <div className="plan-saving fw-bold" style={{ color: `${res?.color_code}` }} >Save {res?.percentage}%</div>}
                          <div className="d-flex Plan-price">
                            {res?.base_price && <span className="pCost-old"> ${res?.base_price}</span>}
                            <span className="pCost" >${res?.amount} </span>
                            <span className="membership-cycle" >/mo</span>
                          </div>
                          <div className="plan-price-Total">
                            <span className="strong">${res?.price_deduction && res?.price_deduction}</span> Every {res?.title} membership
                          </div>
                        </div>
                        <div className="plan-details-list">
                          <p className="strong">
                            {parse(String(res?.description))}
                          </p>

                        </div>
                        <button className="btn btn_trial text-white" onClick={() => handlerMembership(res)} style={{ backgroundColor: `${res?.color_code}` }}>
                          Upgrade your membership
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )

      case 1: {
        Navigator(MEMBERSHIP, { state: { param: data,step:3 } })
      }
    }
  }
  const handlerMembership = (res: any) => {
    setActiveStep(activeStep + 1)
    setData(res)
  }
  return (
    <>
      {
        billingNo == 0 &&
        // <div className='col-lg-12 col-md-12 your-membership-main'>
        //   {
        //     userMember?.user_membership_status == 1 &&
        //     <div className='your-membership'>
        //       <h5 className='section-title'>Your Membership</h5>
        //       <div className='my-3 d-flex w-100 ur-membership-container py-3 justify-content-center'>
        //         <p className='m-0 d-flex align-items-center'>You have {userMember?.title} Membership<span className='plan-price ms-1'> ${userMember?.amount} </span>/mo {userMember?.sub_title}</p>
        //       </div>
        //     </div>
        //   }


        //   <div className='upgrade-membership'>
        //     <h3 className='upgrade-msg mt-4 py-2'>Upgrade your membership <span className='strong'>and save up to 45%</span></h3>
        //     <div className='d-flex w-100 flex-column flex-md-row'>

        //       {
        //         memberData.map((res: any, i: number) => (
        //           <div className={`plan-option${i + 1} member_plan monthy-plan w-50 me-md-2 me-0 mb-3 mb-md-0`} style={{ border: `1px solid ${res?.color_code}` }}>
        //             <div className="plan_head px-4 py-4" style={{ backgroundColor: `${res?.color_code}` }}>
        //               <h3><span className="plan-nm">{res?.title} </span> Membership</h3>
        //             </div>
        //             <div className="plan_content px-4 py-4">
        //               <div className="Plan-price-main d-flex flex-column">
        //                 {parseInt(res?.percentage) != 0 && <div className="plan-saving fw-bold" style={{ color: `${res?.color_code}` }} >Save {res?.percentage}%</div>}
        //                 <div className="d-flex Plan-price">
        //                   {res?.base_price && <span className="pCost-old"> ${res?.base_price}</span>}
        //                   <span className="pCost" >${res?.amount} </span>
        //                   <span className="membership-cycle" >/mo</span>
        //                 </div>
        //                 <div className="plan-price-Total">
        //                   <span className="strong">${res?.price_deduction && res?.price_deduction}</span> Every {res?.title} membership
        //                 </div>
        //               </div>
        //               <div className="plan-details-list">
        //                 <p className="strong">
        //                   {parse(String(res?.description))}
        //                 </p>

        //               </div>
        //               <button className="btn btn_trial text-white" onClick={() => handlerMembership(res)} style={{ backgroundColor: `${res?.color_code}` }}>
        //                 Upgrade your membership
        //               </button>
        //             </div>
        //           </div>
        //         ))
        //       }
        //     </div>
        //   </div>
        // </div>
        <>{handleStepper(activeStep)}</>
      }

      {
        billingNo == 1 &&
        <>
          <ReceiptView open={open} setOpen={setOpen} value={item} />
          <div className='col-lg-12 col-md-12 payment-main'>
            <div className='user-payment-details'>
              <h5 className='section-title'>Payment Detail</h5>
              <div className='my-3 d-flex w-100 payment-details-container py-3 px-4 flex-column'>
                <div className='payment-method w-100 d-flex justify-content-between align-items-start my-2'>
                  <div className='payment-method-logo'>
                    <img src={master_card_img}></img>
                  </div>
                  <div className='card-num-container'>
                    <p className='card-number m-0'>X X X X X X X X X X X X X - 1 2 3 4</p>
                  </div>
                  <div className='card-holder-name'>
                    <p className='card-holder-name m-0'>Cameron Williamson</p>
                  </div>
                  <div className='card-expiration'>
                    <p className='exp-date m-0'>10/2022</p>
                  </div>
                  <div className='card-cvv-container'>
                    <p className='cvv-num m-0'>cvv</p>
                  </div>
                  <div className='action-edit text-end'>
                    <p className='action m-0'><a href='#'>Edit</a></p>
                  </div>
                </div>
                <div className='payment-method w-100 d-flex justify-content-between align-items-start my-2'>
                  <div className='payment-method-logo'>
                    <img src={visa_card_img}></img>
                  </div>
                  <div className='card-num-container'>
                    <p className='card-number m-0'>X X X X X X - 1 2 3 4</p>
                  </div>
                  <div className='card-holder-name'>
                    <p className='card-holder-name m-0'>Cameron Williamson</p>
                  </div>
                  <div className='card-expiration'>
                    <p className='exp-date m-0'>10/2022</p>
                  </div>
                  <div className='card-cvv-container'>
                    <p className='cvv-num m-0'>cvv</p>
                  </div>
                  <div className='action-edit text-end'>
                    <p className='action m-0'><a href='#'>Edit</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-12 col-md-12 payment-history-main'>
            <div className='payment-history-details'>
              <h5 className='section-title'>Payment History</h5>
              <div className='my-3 d-flex w-100 payment-history-container justify-content-between align-items-start py-3 px-4 flex-column'>                
                {
                  payHistory.map((res: any) => (
                    <div className='payment-history-list w-100 d-flex justify-content-between align-items-center my-2'>
                      <div className='payment-for-title'>
                        <p className='payment-name m-0 text-start'>{res?.tittle}</p>
                      </div>

                      <div className='payment-date'>
                        <p className='payment-date m-0 text-start'>{moment(res?.created_at).format('LL')}</p>
                      </div>
                      <div className='payment-amount'>
                        {/* <p className='paid-amount m-0 text-start'>-${res?.final_amount}</p> */}
                        {
                          res?.status == 1 && <p className='paid-amount m-0 text-start' style={{color:'red'}}>-${res?.final_amount}</p>
                        }
                        {
                          res?.status == 2 && <p className='paid-amount m-0 text-start' style={{color:'green'}}>+${res?.final_amount}</p>
                        }
                      </div>
                      <div className='payment-details' onClick={()=>handelReceipt(res)}>
                        <p className='action m-0 text-end'><Link to={''}>View Receipt</Link></p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        </>
      }

    </>
  )
}

export default Step2
