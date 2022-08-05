import { Row, Col } from 'react-bootstrap';
import selectimg from "../../../assets/images/mobileimages/selectimg.svg";
import Star from "../../../assets/images/mobileimages/pointstar.svg";



export const Tier = ({ hiddenFileInput, handleFileChange,
    fileUpload, image, data, onChangeData,  }: any) => {
    return (
        <div>
            <div className="mobileloginform pl-0 pr-1">
                <div className="input-wrapper">
                    <input type="text" id="user"
                        name="name"
                        required
                        value={data?.name}
                        onChange={(e) => onChangeData(e)}
                    />
                    <label htmlFor="user">Name</label>
                </div>

                <div className="mt-4">
                    <Row>
                        <Col md={4} xs={4} className="pr-0">
                            <label className="tier_label pt-4">
                                upload image
                            </label>
                        </Col>

                        <Col md={8} xs={8} className="pr-2 pl-0 text-right">
                            <input type="file"
                                multiple
                                ref={hiddenFileInput}

                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {image && <img src={image} className="image_select1" alt="" />}
                            <img src={selectimg} className="img_select" onClick={fileUpload} alt="" />
                        </Col>
                    </Row>
                </div>

                <div className="mt-3">
                    <Row>
                        <Col md={5} xs={5} className="pr-0">
                            <label className="tier_label psetData2t-3 pt-3">
                                minimum points
                            </label>
                        </Col>

                        <Col md={7} xs={7} className="pr-2 pl-0 text-right">
                            <div className="input_group1">
                                <span>
                                    <img src={Star} className="mr-2" alt="Image" />
                                </span>
                                <input type="number"
                                    onChange={(e) => onChangeData(e)}
                                    className="form-control input_form" 
                                    name="min_points"
                                    value={data?.min_points} 
                                    required />

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}