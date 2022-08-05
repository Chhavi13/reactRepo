import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/header/header';
import "./investme.css"
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import * as alertService from '../../services/AlertService';
import { createInvestor, getInvestor } from '../../services/offer.service';
import { Spinner } from 'react-bootstrap';



const InvestMe = () => {
    let history = useHistory()
    const [userProfileData, setUserProfileData] = useState<any>({});
    const [loading,setLoading] = useState<any>(false)
    const pageBack = () => {
        history.goBack();
    }
    const onTextChange = (e: any) => {
        const key = e.target.name;
        setUserProfileData({ ...userProfileData, [key]: e.target.value });
    }
    let id = useSelector((res: any) => {
        return res?.authReducer?.loginData?.data?.data?.id
    })

    let getData = async () => {
        let res:any = await getInvestor()
        let data:any = res?.data?.data
        console.log("data from get data",data)
        setUserProfileData({
            invest_description:data[0]?.invest_description,
            //invest_target:data[0]?.invest_target,
            invest_amount_tier1:data[0]?.invest_amount_tier,
            invest_benefit_tier1:data[0]?.invest_benefit_tier,
            invest_amount_tier2:data[1]?.invest_amount_tier,
            invest_benefit_tier2:data[1]?.invest_benefit_tier
            
        })
    
    }

    useEffect(() => {
        getData();
        
    }, [])
    const subData = async () => {
        try {
            if (!userProfileData.invest_description || 
                //!userProfileData.invest_target ||
                !userProfileData.invest_amount_tier1 || !userProfileData.invest_benefit_tier1 ||
                !userProfileData.invest_amount_tier2 || !userProfileData.invest_benefit_tier2
            ) {
                alertService.error("All field is required")
                return;
            }
            // else if(Number(userProfileData.invest_target)<(Number(userProfileData.invest_amount_tier1)+Number(userProfileData.invest_amount_tier2))){
            //     alertService.error("Target value should be the sum of Tier 1 and Tier 2")
            //     return;
            // }
            setLoading(true)
            let data = [{
                user: id,
                invest_description: userProfileData?.invest_description,
               // invest_target: userProfileData?.invest_target,
                invest_amount_tier: userProfileData?.invest_amount_tier1,
                invest_benefit_tier: userProfileData?.invest_benefit_tier1,
                tier: 1
            },
            {
                user: id,
                invest_description: userProfileData?.invest_description,
               // invest_target: userProfileData?.invest_target,
                invest_amount_tier: userProfileData?.invest_amount_tier2,
                invest_benefit_tier: userProfileData?.invest_benefit_tier2,
                tier: 2
            }
            ]
            let res: any = await createInvestor(data)
            setLoading(false)
            console.log("response from api", res)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="mobilemaincontainer">
            <div className="mobile_container">
                <div className="sabrinamainscroll create_page">
                    <Header
                        title='Invest in me'
                        back={true}
                        enableback={pageBack}
                        enablenext={!loading && subData}
                        next={loading ? <Spinner className="spinner-offer" animation="grow" variant="primary" /> : "Save"} 
                    />
                    <Form>
                        <div className="mobileloginform p-0 pr-1">
                            <Container>
                                <div className="invest mt-3">
                                    <div className="input-wrapper">
                                        <textarea id="about" placeholder="hey friends, invest fund in me I will do this and i will remember you in my journey."
                                            name="invest_description"
                                            onChange={onTextChange}
                                            value={userProfileData?.invest_description} required>
                                        </textarea>
                                        <label htmlFor="about">about</label>
                                    </div>

                                    {/* <div className="input-wrapper">
                                        <input type="number" id="target" placeholder="$ 50,000" required
                                            name="invest_target"
                                            onChange={onTextChange}
                                            value={userProfileData?.invest_target} />
                                        <label htmlFor="target">target</label>
                                    </div> */}

                                    <h6 className="mt-4 mb-0 ml-2">
                                        tier 1 $
                                    </h6>

                                    <div className="input-wrapper">
                                        <input type="number" id="amount" placeholder="$ 100" required
                                            name="invest_amount_tier1"
                                            onChange={onTextChange}
                                            value={userProfileData?.invest_amount_tier1}
                                        />
                                        <label htmlFor="amount">amount</label>
                                    </div>

                                    <div className="input-wrapper">
                                        <input type="text" id="benefit" placeholder="in tier 1 you will get lorem ipsum dollar text." required
                                            name="invest_benefit_tier1"
                                            onChange={onTextChange}
                                            value={userProfileData?.invest_benefit_tier1}
                                        />
                                        <label htmlFor="benefit">benefit</label>
                                    </div>

                                    <h6 className="mt-4 mb-0 ml-2">
                                        tier 2 $
                                    </h6>

                                    <div className="input-wrapper">
                                        <input type="number" id="amount" placeholder="$ 500" required
                                            name="invest_amount_tier2"
                                            onChange={onTextChange}
                                            value={userProfileData?.invest_amount_tier2}
                                        />
                                        <label htmlFor="amount">amount</label>
                                    </div>

                                    <div className="input-wrapper">
                                        <input type="text" id="benefit" placeholder="in tier 1 you will get lorem ipsum dollar text." required
                                            name="invest_benefit_tier2"
                                            onChange={onTextChange}
                                            value={userProfileData?.invest_benefit_tier2}
                                        />
                                        <label htmlFor="benefit">benefit</label>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </Form>
                </div>

            </div>
        </div>
    )
}

export default InvestMe
