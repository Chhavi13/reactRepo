import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Spinner } from 'react-bootstrap';
import { CreateOfferPreview } from './createOfferPreview';
import { ListPreview } from './listPreview';
import { ListEvent } from './listEvent';
import { ThankYouScreen } from '../thankYou/thankYou';
import { useState } from 'react';
import * as alertService from '../../services/AlertService';
import { useEffect } from 'react';
import { Header } from '../../components/header/header'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { CREATE_OFFER_OBJECT, CREATE_OFFER_IMAGES, CREATE_OFFER_APIIMAGES } from '../../redux/action/actionTypes/getOfferActionsTypes';
import * as offer from "../../services/offer.service"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad', 'Create an ad'];
}

export default function ListStepper(props: any) {
  let history = useHistory();
  const location = useLocation()
  const dispatch = useDispatch();
  const [pageBack, setPageBack] = React.useState<boolean>(false)
  const [submittingOffer, onSubmittingOffer] = React.useState<boolean>(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  // send data using props

  const [sendData, setSendData] = React.useState<any>({})
  const [propsData, setPropsData] = useState<any>({})
  const [images, setImages] = useState<any>([])
  const [date, setDate] = useState<any>("")
  const [apiImage, setApiImage] = useState<any>([])
  const [resData, setResData] = useState<any>({})
  const [previewID, setPreviewID] = useState<number>(parseInt(props?.match?.params?.id))


  const onDataHandles: any = (formData: any, image: any, apiImage: any) => {
    setPropsData(formData);
    setImages(image)
    setApiImage(apiImage)
  }

  const getOfferList = async () => {
    setActiveStep(1)
    const response: any = await offer.getOfferListSingle(previewID);
    // console.log(response)
    if (response?.data && response?.data?.data?.event_offer_images) {
      response.data['images'] = response.data.event_offer_images
      setSendData(response?.data?.data);
      setImages(response?.data?.data?.event_offer_images)
      // console.log(response.data)
    } else {
      console.log('error')
    }
  }

  useEffect(() => {
    // console.log('previewID',previewID)
    previewID && getOfferList()
  }, [previewID])

  const getStepContent: any = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <CreateOfferPreview
            onDataHandles={onDataHandles}
            base64ImagesURI={images}
            actualAPIFiles={apiImage}
            pageData={propsData}
            pageBack={pageBack}
          />
        );
      case 1:
        return (
          <ListPreview
            date={date}
            sendData={sendData}
            images={images}
            isPreview={previewID ? true : false}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <ListEvent
            date={date}
            sendData={sendData}
            images={images}
            isPreview={previewID ? true : false}
          />

        );
      case 3:
        return (
          <ThankYouScreen
            date={date}
            sendData={sendData}
            images={images}
            isCreateOffer={true}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }
  const convertToFormData = () => {
    let formData = new FormData();
    formData.append('audience', propsData.audience ? propsData.audience : 1);
    formData.append('cost', propsData?.cost ? propsData?.cost : 0);
    formData.append('disclaimer', propsData.disclaimer);
    formData.append('is_allow_tips', propsData.is_allow_tips || false);
    formData.append('is_private', propsData.is_private || false);
    formData.append('offer_bio', propsData.offer_bio);
    formData.append('offer_title', propsData.offer_title);
    let tags: any = {};
    if (propsData?.primary_tag) {
      tags['primary'] = propsData?.primary_tag?.id;
    }
    if (propsData?.secondary_tag) {
      tags['secondary'] = propsData?.secondary_tag?.id;
    }
    if (propsData?.general_tag) {
      tags['ideas_tag'] = propsData.general_tag;
    }
    formData.append('tags', JSON.stringify(tags));

    for (let i = 0; i < apiImage.length; i++) {
      formData.append('event_offer_images', apiImage[i]);
    }
    //debugger
    return formData;
  }

  //get data from reducer
  const getOfferState = useSelector((state: any) => {
    return state?.getOfferReducer?.offerList?.data?.data
  });

  let profileDataRedux = useSelector((state: any) => {
    return state.authReducer?.personalData?.data?.data?.event_offer_creator
  })


  let createOfferHandler = async () => {
    try {
      const payload = convertToFormData();
      onSubmittingOffer(true);
      const response = await offer.createOffer(payload);
      if (response?.status === 201) {
        // setResData(response?.data?.data);
        onSubmittingOffer(false);
        setPageBack(false)
        dispatch({ type: CREATE_OFFER_OBJECT, payload: {} });
        dispatch({ type: CREATE_OFFER_IMAGES, payload: {} })
        dispatch({ type: CREATE_OFFER_APIIMAGES, payload: {} })
        setPropsData({});
        setImages([])
        setApiImage([]);
        setActiveStep(0);

        // alertService.success(response?.data?.message);
        // if (getOfferState || profileDataRedux) {
        if (profileDataRedux) {
          // getOfferState && getOfferState.splice(0, 0, response?.data?.data)
          profileDataRedux && profileDataRedux.splice(0, 0, response?.data?.data)
        }
      } else {
        alertService.error(response?.data?.message)
        onSubmittingOffer(false);
      }
    } catch (error: any) {
      alertService.error(error.message);
      onSubmittingOffer(false);
    }
  }

  const handleNext = () => {
    if (!propsData.offer_title) {
      let errors: any = [];
      if (!propsData.offer_title) {
        errors.push('Title');
      }
      let msg: string = '';
      errors.forEach((elem: any, index: any) => {
        msg += `${index + 1}${")"} ${elem} is required \n `
      });
      alertService.error(msg);
    } else {
      setSendData({sendData, ...propsData});
      createOfferHandler()
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // if (activeStep === 0) {
      //   setSendData(propsData)
      // }
      // if (activeStep === 1) {
      // }
    }
  };

  const handleBack = () => {
    (previewID && activeStep === 1) ? history.goBack() : setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setPageBack(true);
  };

  const handleReset = async () => {
    // await HandleData();
  };

  return (
    <div className={classes.root}>
      <div className="mobilemaincontainer">
        <div className="mobile_container dash_tabs">
          <div className="sabrinamainscroll create_page list_page_head">
            {
              <Header
                title={
                  (activeStep === 0 && 'Create post') ||
                  (activeStep === 1 && 'List Preview') ||
                  (activeStep === 2 && 'List Preview') ||
                  (activeStep === 3 && 'My Event/Offer')
                }
                next={
                  !previewID && (activeStep === 0 ? (submittingOffer ?
                    <Spinner className="spinner-offer" animation="grow" variant="primary" /> : 
                    'Post'
                  ) : (activeStep === steps.length - 1 ? 'Finish' : 'Next'))
                }
                back={activeStep !== 0 && true}
                // enablenext={() => { activeStep === 1 ? createOfferHandler() : handleNext() }}
                enablenext={handleNext}
                enableback={handleBack}
              />
            }
          </div>
          {getStepContent(activeStep)}
        </div>
      </div>

    </div>
  );
}
