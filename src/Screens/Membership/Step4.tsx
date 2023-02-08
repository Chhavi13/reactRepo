import React, { useEffect, useState } from 'react'
import "./Membership.scss";
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { getCoupenData } from '../../Service/membership';
import MembershipDetail from '../../Common/membershipDetail/membershipDetail';

let hearAbout: any = []
const Step4 = ({ value, setValue, data, error, setError, handleNext, loading, handleRef }: any) => {
    let tax = 0;
    const [coupon, setCoupon] = useState<string>("")
    const [couponLoading, setCouponLoading] = useState(false)
    const [couponSaving, setCouponSaving] = useState<any>(null)
    let [calculationTax, setCalculationTax] = useState<number>(data?.amount ? Number(data?.amount) * tax / 100 : 0)
    const [finalAmt, setFinalAmt] = useState(0)
    const [couponId, setCouponId] = useState<any>(null)
    const [couponErr, setCoponErr] = useState<any>("")
    // useEffect(() => {
    //     window.onbeforeunload = function () {
    //         return "Leaving this page will reset the wizard";
    //     };
    // }, [])
    const finalAmount = () => {

        setFinalAmt((Number(data?.amount) * tax / 100) + Number(data.amount))
    }
    const taxCalculateFun = () => {
        setCalculationTax(Number(data?.amount) * tax / 100)
    }
    useEffect(() => {

        finalAmount();
    }, [])


    let user: any = localStorage.getItem("Nurture_user_data")
    user = JSON.parse(user)

    let coupenHandler = async () => {
        try {
            if (!coupon) return;
            setCouponLoading(true)
            let res: any = await getCoupenData({ coupon_code: coupon, user_id: user.id })
            let isSucess = res.data.success;
            let msgArray = res.data.message;
            let msg: any = "";

            for (let i = 0; i < msgArray.length; i++) {
                msg += msgArray[i]
            }
            if (!isSucess) {
                // toast.error(msg)
                setCoponErr(msg)
            }
            if (isSucess) {
                let resData = res.data.data;
                if (resData.type === "amount") {                    
                    let discount = Number(resData?.amount) > Number(data?.amount) ?Number(data?.amount):Number(resData?.amount)
                    let discountAmt = Number(data?.amount) - discount;
                    setCouponSaving(discount)
                    setCalculationTax(discountAmt * tax / 100)
                    // setFinalAmt((discountAmt * tax / 100) + Number(data?.amount))
                    setFinalAmt((discountAmt * tax / 100) + discountAmt)
                }
                if (resData.type === "percentage") {

                    let Amount = Number(data?.amount)
                    let discount = Number(resData?.amount)
                    let withDisc = Amount * discount / 100;
                    let calculationTaxes = (Amount - discount) * tax / 100;
                    setCouponSaving(withDisc)
                    setCalculationTax(calculationTaxes)
                    setFinalAmt(calculationTaxes + (Amount - withDisc))


                }
                setCouponId(resData.id)
            }

            setCouponLoading(false)
        } catch (error) {
            setCouponLoading(false)
        }
    }
    let removeCoupon = () => {
        setCouponSaving("")
        setCouponId(null)
        finalAmount()
        taxCalculateFun()
    }
    let handlePayment = () => {
        let obj = {
            amount: data.amount,
            total_amount: finalAmt,
            tax,
            membership_id: data.id,
            coupon_amount: couponSaving,
            coupon_id: couponId,
            tax_amount: calculationTax
        }
        handleNext(obj)
    }

    return (
        <div>
            <ToastContainer />
            <MembershipDetail
                data={data}
                handleNext={handleNext}
                type="member"
            />
        </div>
    )
}

export default Step4;
