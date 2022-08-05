import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReactPlayer from 'react-player/lazy';


// import itemData from './itemData';

import Image1 from "../../assets/images/mobileimages/media/img1.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root1: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    // title: {
    //   color: theme.palette.primary.light,
    // },
    // titleBar: {
    //   background:
    //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    // },
  }),
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineImageList(props: any) {
  const classes = useStyles();

const playerRef: any = useRef();
 
  return (
    <div className={classes.root1}>
      <div className="media_gallery">
        <ImageList className={`${classes.imageList} available-items mb-2`} cols={3.5}>

          {
            props.img && props.img.map((item: any, i:any) => {
              let imageSecion;
              if (item.src && item.type === 'image') {
                imageSecion = (
                  <ImageListItem className='media-vedio media-images'>
                  {/* <ImageListItem className='media-vedio media-images'> */}

                    <img src={item.src} className="media1"
                       onClick={() => props.openLightbox(item)}
                      alt=""
                    />

                  </ImageListItem>
                )
              }
              else if (item.src && item.type === 'video') {
                imageSecion = (
                <li className='media-vedio media-images' key={i}>
                  {/* <div className="mediaprofile_section"> */}
                  {/* <div className="image_upload"> */}
                  <ImageListItem>

                  <ReactPlayer
                    ref={playerRef}
                    url={item.src}
                    width='100%'
                    height='100%'
                    muted={false}
                    controls={true}
                    onPlay={props.exitFullscreen}
                  // onEnded={exitFullscreen}
                  />
                  </ImageListItem>

                  {/* </div> */}
                  {/* </div> */}
                </li>)
              }
              return imageSecion;
              {/* <img src={item.src} /> */ }

              {/* <ImageListItemBar
            title="image tittle"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton aria-label={`star item tittlew`}>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          /> */}
            })
          }


        </ImageList>
      </div>
    </div>
  );
}