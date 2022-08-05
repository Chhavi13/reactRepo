import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/header/header';
// import "./investme.css"
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import * as alertService from '../../services/AlertService';
import { createInvestor, getInvestor } from '../../services/offer.service';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { getProfile, updateProfile } from '../../services/auth.service';



const Subscription = () => {
    let history = useHistory()
    const [userProfileData, setUserProfileData] = useState<any>({
        subscript_discount: 0
    });
    const [loading, setLoading] = useState<any>(false)
    let [discount, setDiscount] = useState<number>(0);

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
        let res: any = await getProfile()
        let data: any = res?.data?.data
        setUserProfileData(data)

    }
    useEffect(() => {
        getData();

    }, [])
    const subDataSubs = async () => {
        try {
            
            setLoading(true)
            const payload = {
                subscript_discount:userProfileData?.subscript_discount,
                subscript_cost:userProfileData?.subscript_cost,
                subscript_description:userProfileData?.subscript_description
            }
            let res: any = await updateProfile(payload)
            setLoading(false)
            console.log("response from api", res)

        } catch (error) {
            console.log(error)
        }
    }
    const calculateDiscount = (type: string) => {
        if (type === '+') {
            setDiscount(++discount);
            setUserProfileData({
                ...userProfileData,
                ["subscript_discount"]:  (userProfileData?.subscript_discount +1)
            })
        } else {
            if (userProfileData?.subscript_discount > 0) {
                setDiscount(--discount);
                setUserProfileData({
                    ...userProfileData,
                    ["subscript_discount"]: (userProfileData.subscript_discount-1)
                })
            }
        }
    }
    console.log("data on local",userProfileData)
    return (
        <div className="mobilemaincontainer">
            <div className="mobile_container">
                <div className="sabrinamainscroll create_page">
                    <Header
                        title='Subscription'
                        back={true}
                        enableback={pageBack}
                        enablenext={!loading && subDataSubs}
                        next={loading ? <Spinner className="spinner-offer" animation="grow" variant="primary" /> : "Save"}
                    />
                    <div className="section_border"></div>
                    <Form>
                        <div className="mobileloginform p-0 pr-1">
                            <Container>
                                <div className="invest mt-3">
                                    <div className="input-wrapper">
                                        <textarea id="about" placeholder="Enter blurb."
                                            name="subscript_description"
                                            onChange={onTextChange}
                                            value={userProfileData?.subscript_description} required>
                                        </textarea>
                                        <label htmlFor="about">Blurb</label>
                                    </div>

                                    <div className="input-wrapper">
                                        <input type="text" id="target" placeholder="0" required
                                            name="subscript_cost"
                                            onChange={onTextChange}
                                            value={userProfileData?.subscript_cost} />
                                        <label htmlFor="target">cost</label>
                                    </div>
                                    <div className="discount mt-3 mb-3">
                                        <Row>
                                            <Col md={7} xs={7}>
                                                <p className="d-block pt-3">
                                                    3m discount
                                                </p>
                                            </Col>

                                            <Col md={5} xs={5}>
                                                <Button variant="contained" className="default_btn2 mt-3 mb-4"
                                                    name="minus"
                                                    onClick={() => calculateDiscount('-')}>-</Button>
                                                <span className="rate">
                                                    {userProfileData?.subscript_discount} %
                                                </span>
                                                <Button variant="contained" className="default_btn2 mt-3 mb-4"
                                                    name="add"
                                                    onClick={() => calculateDiscount('+')}>+</Button>
                                            </Col>
                                        </Row>
                                        <div className="section_border"></div>
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

export default Subscription
