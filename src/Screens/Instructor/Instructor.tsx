import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./Instructor.scss";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Panel from "../../Assets/img/Panel.png"
import { userProfileApi } from '../../Service/user';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const Instructor = () => {
    let param = useParams()
    const [data, setData] = useState<any>({})
    const Navigate = useNavigate()
    console.log("param", data)
    const getData = async () => {
        try {
            let res: any = await userProfileApi(param?.id)
            setData(res?.data?.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <Container fluid className='instructorr'>
            <div className="row">
                <div className="col-lg-12 py-2">
                    <div className="back-pg" onClick={() => Navigate(-1)}>
                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIosNewIcon"><path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path></svg>Back
                    </div>
                </div>
            </div>
            {/* <div className='back mb-5 mt-5' onClick={() => Navigate(-1)}>
                <ArrowBackIosIcon fontSize="small" />
                <a>Go back</a>
            </div> */}
            <Row>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <Container className='instructor-container'>
                        <Row>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <Row>
                                    <Col lg="5" md="4" sm="12" xs="12" className='mb-4 mb-md-0'>
                                        <div className='img-section'>
                                            <img src={data?.photo} alt="instructor" className='img-fluid' />
                                        </div>

                                    </Col>
                                    <Col lg="7" md="8" sm="12" xs="12">
                                        <div className='instructor-name'>
                                            <h3>{data?.name}</h3>
                                            <p>({data?.designation})
                                            </p>
                                        </div>
                                        <div className='content-area'>
                                            <p>
                                                {parse(String(data?.about_us))}
                                                {/* {data?.about_us} */}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </Container>
                </div>
            </Row>
        </Container >
    )
}

export default Instructor