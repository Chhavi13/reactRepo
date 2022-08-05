/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 500,
      height: 'auto',
    },
  }),
);

export const ImageLists = ({ openCarousel, sliderImages, item }: any) => {
  const [offerImages, setOfferImages] = useState<any>([]);
  const classes = useStyles();

  const setMedia = () => {
    let data: any = [];
    if (sliderImages) {
      sliderImages?.filter((imgItem: any, i: number) => {
        data.push({ file: imgItem, position: i })
      })
    } else {
      item?.event_offer_images?.filter((imgItem: any, i: number) => {
        data.push({ file: imgItem.file, position: i })
      })
    }
    return data;
  }


  useEffect(() => {
    const _sliderImages: any = setMedia();
    setOfferImages(_sliderImages);
  }, [item, sliderImages, openCarousel])

  const setCols = (i: number) => {
    if (offerImages.length > 1) {
      if (offerImages.length % 2 && (i) === offerImages.length) return 2;
      else return 1;
    }
    else return 2;
  }

  return (
    <ImageList className={classes.imageList} style={{marginBottom: '10px'}}>
      {
        offerImages?.map((ImageItem: any, i: number) => {
          if (i < 4) {
            return (
              <ImageListItem
                key={i}
                cols={setCols(i + 1)}>
                {/* <LazyLoadImage
                  effect="blur"
                  height={'100%'}
                  src={ImageItem?.file || ImageItem}
                  alt={ImageItem?.title || i}
                  onClick={() => openCarousel && openCarousel(ImageItem, item?.id)}
                /> */}
                <img
                  src={ImageItem?.file || ImageItem}
                  alt={ImageItem?.title || i}
                  onClick={() => openCarousel && openCarousel(ImageItem, item?.id)}
                />
                {
                  offerImages.length > 4 && i === 3 &&
                  <ImageListItemBar title={`+ ${offerImages.length - 4}`} />
                }
              </ImageListItem>
            )
          }
        })}
    </ImageList>
  )
}