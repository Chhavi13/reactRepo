import React from 'react';
/* eslint-disable array-callback-return */
import { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "./photo";

let carouselImages: any = []

interface IProps {
  imageArray: any;
  image: any;
  isOpenCarousel: any;
  setIsOpenCarousel: any;
}


export const PhotoGallery: React.FC<IProps> = ({ imageArray, image, isOpenCarousel, setIsOpenCarousel }) => {
  const SortablePhoto = SortableElement((item: any) => <Photo {...item} />);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // const openLightbox = useCallback((event, { photo, index }) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);

  useEffect(() => {
    isOpenCarousel && openLightbox();
  }, [isOpenCarousel])

  const openLightbox = () => {
    const images: any = [];
    imageArray?.filter((imgItem: any, i: number) => {
      images.push({ src: imgItem.file || imgItem, position: i });
    })
    carouselImages = images;

    const index = carouselImages?.findIndex((x: any) => x.position === image.position);
    setCurrentImage(index);
    setViewerIsOpen(true);
    setIsOpenCarousel(false)
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  // const SortableGallery = SortableContainer(({ items }: any) => (
  //   <Gallery photos={photos}
  //     renderImage={props => <SortablePhoto {...props} />}
  //   />
  // ));

  return (
    <div>
      {/* {photos.length > 0 &&
        <Gallery photos={photos} onClick={openLightbox} direction={"column"} columns={2} />
      } */}

      {/* <SortableGallery items={photos} onSortEnd={onSortEnd} /> */}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={carouselImages.map((x: any) => ({
                ...x,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
