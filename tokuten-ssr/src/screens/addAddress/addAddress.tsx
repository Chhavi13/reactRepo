
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';
import * as images from '../images'
import Button from "@material-ui/core/Button";
import * as authservice from '../../services/auth.service'
import * as alertService from '../../services/AlertService';
import { useHistory } from 'react-router-dom';
import { getAddressData, getAddressDataByID } from '../../redux/action/addressAction';
import "./addAdress.scss";
import * as address from "../../services/adress.service"

interface IProps { }

class FormDataHandle {
  first_name: any;
  last_name: any;
  address_line_1: any;
  address_line_2: any;
  city: any;
  zip_code: any;
  country: any;
  state: any;
  user: any;
}

export const AddAddress: React.FC<IProps> = (props: any) => {
  let [formData, setFormData] = useState<FormDataHandle>({
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    zip_code: '',
    country: '',
    state: '',
    user: '',
  })
  const history = useHistory()
  const dispatch = useDispatch()
  const [editAddID, setEditAddID] = useState<number>(parseInt(props?.match?.params?.id))
  const [editAddDetails, setEditAddDetails] = useState<FormDataHandle>({
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    zip_code: '',
    country: '',
    state: '',
    user: '',
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  let onChange = (e: ChangeEvent<HTMLInputElement>) => {
    editAddID ? onDataEdit(e) : onDataChange(e)
  }

  let onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editAddID ? SubEditData(e) : SubData(e)
  }

  let onDataChange = (e: any) => {
    let name: string = e.target.name;
    const newState = { ...formData, [name]: e.target.value };
    setFormData({ ...formData, ...newState })
  }

  let onDataEdit = (e: ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name;
    const newState = { ...editAddDetails, [name]: e.target.value };
    setEditAddDetails({ ...editAddDetails, ...newState })
  }

  let SubEditData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)
    // console.log('edditt', editAddDetails)
    try {
      const response: any = await address.updateAddress(editAddID, editAddDetails)
      getAddressList();
      // alertService.success(response?.data?.message)
      setIsSubmitting(false)
    } catch (error: any) {
      console.log(error?.message)
      alertService.error(error?.message)
      setIsSubmitting(false)
    }
  }

  const pageBack = () => {
    history.goBack();
  }

  const isID = () => {
    let authData: any = localStorage.getItem('authData')
    authData = JSON.parse(authData)
    return authData ? authData : false
  }
  let SubData = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true)
    formData.user = isID().id;
    try {
      const response: any = await address.addAddress(formData);
      getAddressList();
      // alertService.success(response?.data?.message)
      setIsSubmitting(false)
    } catch (error: any) {
      console.log(error?.message)
      alertService.error(error?.message)
      setIsSubmitting(false)
    }
  }
  const getAddressByID = async () => {
    try {
      const response: any = await dispatch(getAddressDataByID(editAddID));
      setEditAddDetails(response?.payload)
    } catch (error) {
      console.log(error)
    }
  }

  const getAddressList = async () => {
    try {
      await dispatch(getAddressData());
      history.push('/address');
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    editAddID && getAddressByID();
  }, [])


  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container signupmobcontainer">
        <div className="sabrinamainscroll">
          <div className="border_small">
            <div className="session_small">
              <img src={images.mobleftarrow} onClick={pageBack} className="leftarrowimg" alt="back" />
              <div className="session_smallcontainer">

              </div>
            </div>
          </div>
          <div className="add-address-form mobileaddressform">
            <div className="pay_type mt-4">
              <div className="pay_form">
                <h4 className="text-capitalize">
                  add your delivery address
                </h4>
                <div className="form_delivery">
                  <form onSubmit={onSubmit}>
                    <Row>
                      <Col md={6} sm={6} xs={6} className="signinformpadding">
                        <div className="input-wrapper">
                          <input type="text" value={editAddID ? editAddDetails?.first_name : formData?.first_name} name="first_name" onChange={(e: any) => onChange(e)} id="user" required />
                          <label htmlFor="user">first name</label>
                        </div>
                      </Col>
                      <Col md={6} sm={6} xs={6} className="signinformpaddingleft">
                        <div className="input-wrapper">
                          <input type="text" value={editAddID ? editAddDetails?.last_name : formData?.last_name} name="last_name" id="user" onChange={(e: any) => { onChange(e) }} required />
                          <label htmlFor="user">last name</label>
                        </div>
                      </Col>
                    </Row>

                    <div className="input-wrapper">
                      <input type="text" id="address" name="address_line_1" value={editAddID ? editAddDetails?.address_line_1 : formData?.address_line_1} onChange={(e: any) => { onChange(e) }} required />
                      <label htmlFor="address">address line 1</label>
                    </div>

                    <div className="input-wrapper">
                      <input type="text" id="address" name="address_line_2" value={editAddID ? editAddDetails?.address_line_2 : formData?.address_line_2} onChange={(e: any) => { onChange(e) }} required />
                      <label htmlFor="address">address line 1</label>
                    </div>

                    <div className="input-wrapper">
                      <input type="text" id="city" name="city" value={editAddID ? editAddDetails?.city : formData?.city} onChange={(e: any) => { onChange(e) }} required />
                      <label htmlFor="city">City</label>
                    </div>

                    <div className="input-wrapper">
                      <div className="select_img">
                        <select id="country" name="country" value={editAddID ? editAddDetails?.country : formData?.country} onChange={(e: any) => { onChange(e) }} >
                          <option value="select country">
                            Select Country
                          </option>
                          <option value='India'>India</option>
                        </select>
                      </div>
                      <label htmlFor="country">Country</label>
                    </div>

                    <div className="input-wrapper">
                      <div className="select_img">
                        <select id="state" value={editAddID ? editAddDetails?.state : formData?.state} name="state" onChange={(e: any) => { onChange(e) }}>
                          <option value="select state">
                            Select State
                          </option>
                          <option value='Madhya Pradesh'> Madhya Pradesh </option>
                          <option value='Rajasthan'>Rajasthan</option>
                          <option value='Gujrat'>Gujrat</option>
                          <option value='Maharastra'>Maharastra</option>
                        </select>
                      </div>
                      <label htmlFor="state">State</label>
                    </div>

                    <div className="input-wrapper">
                      <input type="text" id="code" name="zip_code" value={editAddID ? editAddDetails?.zip_code : formData?.zip_code} required onChange={(e: any) => { onChange(e) }} />
                      <label htmlFor="code">Zip Code</label>
                    </div>

                    <div className="mobile_continuebtn mt-4 mb-3">
                      <Button variant="contained" color="primary" type="submit">
                        {isSubmitting
                          ? <Spinner animation="border" variant="light" />
                          : <span>{editAddID ? 'Update' : 'Save'}</span>
                        }
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}