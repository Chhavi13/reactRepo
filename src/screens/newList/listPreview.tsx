import React, { useState } from 'react'
import "./listPreview.scss";
import TabIcon from '../tabs/tabs';
import { isLogin } from '../../utils';
import { OfferDetail } from '../../components/offerDetail/offerDetail';
import { PhotoGallery } from '../../components/gallery/photoGallery';

export const ListPreview = (props: any) => {

  let [isOpenCarousel, setIsOpenCarousel] = useState<boolean>(false);
  let [galleryImage, setGalleryImage] = useState<any>({});
  let [galleryImageArray, setGalleryImageArray] = useState<any>([]);

  console.log(props);

  const openCarousel = (imgItem: any) => {
    setGalleryImage(imgItem)
    setGalleryImageArray(props.images)
    setIsOpenCarousel(true)
    console.log('refe', galleryImageArray)
  }


  return (
    <>

      <PhotoGallery
        isOpenCarousel={isOpenCarousel}
        setIsOpenCarousel={setIsOpenCarousel}
        image={galleryImage}
        imageArray={galleryImageArray}
      />

      <div className="mobilemaincontainer">
        <div className="mobile_container dash_tabs hvh_100">
          <div className="pt-2">

            <OfferDetail item={props.sendData}
              sliderImages={props.images}
              isPreview={props?.isPreview}
              stepperCase={1}
              setActiveStep={props.setActiveStep}
              openCarousel={openCarousel}
            />

          </div>
          {isLogin() && <TabIcon />}
        </div>
      </div >
    </>
  )
}