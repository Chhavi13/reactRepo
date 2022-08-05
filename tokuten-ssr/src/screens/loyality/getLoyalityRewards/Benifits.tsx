import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Row, Col } from 'react-bootstrap';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Switch from '@material-ui/core/Switch';


export const Benifits = ({ data2, setData2,changeData, }: any) => {
  
    return (
        <div>
            <div className="top_benefit mt-3">
                <div className="box_list p-0">
                    <div className="profile_content pr-0 pl-1">
                        <Row>

                            <Col md={9} xs={9}>
                                <label>discounts</label>

                            </Col>
                        </Row>

                        <Row className="mt-3">

                            <Col md={7} xs={7}>
                                <div className="no_tier p-0">
                                    <div className="select_icon">
                                        <select className="form-control" name="discount_offers" value={data2?.discount_offers} onChange={(e) => { changeData(e) }} >
                                            <option value="ALL">
                                                all offers
                                            </option>

                                            <option value="ALL">
                                                all offers
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </Col>

                            <Col md={5} xs={5}>
                                <div className="no_tier mt-1 p-0">
                                    <Button variant="outlined" className="d-inline-block btn_count" disabled={data2?.discount === 1}
                                        onClick={() => setData2({
                                            ...data2,
                                            ['discount']: (data2?.discount - 1)
                                        })}>
                                        <RemoveIcon />
                                    </Button>
                                    <p className="d-inline-block">
                                        {data2?.discount}%
                                    </p>
                                    <Button variant="outlined" className="d-inline-block btn_count"
                                        onClick={() => setData2({
                                            ...data2,
                                            ['discount']: (data2?.discount + 1)
                                        })}>
                                        <AddIcon />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="section_border"></div>

                <div className="box_list p-0">
                    <div className="profile_content pr-0 pl-1">
                        <Row>
                            <Col md={9} xs={9}>
                                <label>engagement</label>

                            </Col>
                            <Col md={3} xs={3} className="text-right">
                                <Switch
                                    checked={data2?.is_engagement}
                                    id="custom-switch-4"
                                    onChange={(e) => changeData(e)}
                                    color="primary"
                                    name="is_engagement"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </Col>
                        </Row>
                        {data2?.is_engagement && <div className="mobileloginform pl-0 pr-2">
                            <div className="input-wrapper pl-0 mt-3">
                                <textarea id="benefits"
                                    value={data2?.benefits_desc}
                                    name="benefits_desc"
                                    placeholder="Set engagement benefits you will offer in this Tier" required
                                    // name="company_bio"
                                    onChange={(e) => changeData(e)}
                                ></textarea>
                                <label htmlFor="benefits">benefits</label>
                            </div>
                        </div>}
                    </div>
                </div>


            </div>
            <div className="section_border"></div>
            <div className="box_list p-0">
                <div className="profile_content pr-0 pl-1">
                    <Row>
                        <Col md={9} xs={9}>
                            <label>exclusive</label>

                        </Col>
                        <Col md={3} xs={3} className="text-right">
                            <Switch 
                                checked={data2?.is_exclusive}
                                id="custom-switch-4"
                                onChange={(e) => changeData(e)}
                                color="primary"
                                name="is_exclusive"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </Col>
                    </Row>
                    {data2?.is_exclusive && <div className="mobileloginform pl-0 pr-2">
                        <div className="input-wrapper pl-0 mt-3 ">
                            <textarea id="benefits" placeholder="Set engagement benefits you will offer in this Tier" required
                                name="exclusive_desc"
                                value={data2?.exclusive_desc}
                                onChange={(e) => { changeData(e) }}
                            ></textarea>

                            <label htmlFor="benefits" style={{width:"50px"}}>benefits</label>
                        </div>
                    </div>}
                </div>
                <div className="section_border"></div>
                <div className="actual_point p-0">
                    <div className="box_list p-0 mb-0">
                        <div className="profile_content pr-0 pl-1">
                            <Row>
                                <Col md={9} xs={9}>
                                    <label>boost point actual</label>

                                </Col>
                                <Col md={3} xs={3} className="text-right">
                                    <Switch
                                        checked={data2?.is_point_booster}
                                        id="custom-switch-4"
                                        onChange={(e) => changeData(e)}
                                        color="primary"
                                        name="is_point_booster"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    {data2?.is_point_booster && <div>
                        <div className="actual_point_content">
                            <div className="no_tier pl-1 pr-2">
                                <Row>
                                    <Col md={5} xs={5}>
                                        <label className="tier_label pt-2">
                                            subscription spend
                                        </label>
                                    </Col>
                                    <Col md={7} xs={7} className="text-right">
                                        <Button variant="outlined" className="d-inline-block btn_count"
                                            disabled={data2?.subs_point_booster === 1}
                                            onClick={() => setData2({
                                                ...data2,
                                                ['subs_point_booster']: (data2.subs_point_booster - 1)
                                            })}>
                                            <RemoveIcon />
                                        </Button>
                                        <p className="d-inline-block">
                                            {data2?.subs_point_booster} x
                                        </p>
                                        <Button variant="outlined" className="d-inline-block btn_count"
                                            onClick={() => setData2({
                                                ...data2,
                                                ['subs_point_booster']: (data2?.subs_point_booster + 1)
                                            })}>
                                            <AddIcon />
                                        </Button>

                                        <InfoOutlinedIcon className="ml-3" />
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="section_border"></div>
                        <div className="actual_point_content">
                            <div className="no_tier pl-1 pr-2">
                                <Row>
                                    <Col md={5} xs={5}>
                                        <label className="tier_label pt-2">
                                            invester spend
                                        </label>
                                    </Col>
                                    <Col md={7} xs={7} className="text-right">
                                        <Button variant="outlined" className="d-inline-block btn_count" disabled={data2.investor_point_booster === 1}
                                            onClick={() => setData2({
                                                ...data2,
                                                ['investor_point_booster']: (data2?.investor_point_booster - 1)
                                            })}>
                                            <RemoveIcon />
                                        </Button>
                                        <p className="d-inline-block">
                                            {data2?.investor_point_booster} x
                                        </p>
                                        <Button variant="outlined" className="d-inline-block btn_count"
                                            onClick={() => setData2({
                                                ...data2,
                                                ['investor_point_booster']: (data2?.investor_point_booster + 1)
                                            })}>
                                            <AddIcon />
                                        </Button>

                                        <InfoOutlinedIcon className="ml-3" />
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="section_border"></div>

                        <div className="actual_point_content">
                            <div className="no_tier pl-1 pr-2">
                                <Row>
                                    <Col md={5} xs={5}>
                                        <label className="tier_label pt-2">
                                            tips
                                        </label>
                                    </Col>
                                    <Col md={7} xs={7} className="text-right">
                                        <Button variant="outlined" className="d-inline-block btn_count" disabled={data2?.tips_point_booster === 1}
                                            onClick={() => setData2({
                                                ...data2,
                                                ['tips_point_booster']: (data2?.tips_point_booster - 1)
                                            })}>
                                            <RemoveIcon />
                                        </Button>
                                        <p className="d-inline-block">
                                            {data2?.tips_point_booster} x
                                        </p>
                                        <Button variant="outlined" className="d-inline-block btn_count"
                                            onClick={() => setData2({
                                                ...data2,
                                                ['tips_point_booster']: (data2?.tips_point_booster + 1)
                                            })}>
                                            <AddIcon />
                                        </Button>

                                        <InfoOutlinedIcon className="ml-3" />
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="section_border"></div>

                        <div className="actual_point_content">
                            <div className="no_tier pl-1 pr-2">
                                <Row>
                                    <Col md={5} xs={5}>
                                        <label className="tier_label pt-2">
                                            private content
                                        </label>
                                    </Col>
                                    <Col md={7} xs={7} className="text-right">
                                        <Button variant="outlined" className="d-inline-block btn_count" disabled={data2?.private_cont_point_booster === 1}
                                            onClick={() => setData2({
                                                ...data2,
                                                ['private_cont_point_booster']: (data2?.private_cont_point_booster - 1)
                                            })}>
                                            <RemoveIcon />
                                        </Button>
                                        <p className="d-inline-block">
                                            {data2?.private_cont_point_booster} x
                                        </p>
                                        <Button variant="outlined" className="d-inline-block btn_count"
                                            onClick={() => setData2({
                                                ...data2,
                                                ['private_cont_point_booster']: (data2?.private_cont_point_booster + 1)
                                            })}>
                                            <AddIcon />
                                        </Button>

                                        <InfoOutlinedIcon className="ml-3" />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}