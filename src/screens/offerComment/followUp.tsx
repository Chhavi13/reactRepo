import React from 'react'
import Image from "../../assets/images/mobileimages/1.png";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar';


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

const FollowUp = ({ data }: any) => {
    
    const classes = useStyles();

    return (
        <>
            {data?.map((data: any, item: number) => (

                <div key={item}>
                    <p>
                        {data?.follow_up}
                    </p>

                    <div className={classes.root}>
                        <ImageList
                            // rowHeight={160}
                            className={classes.imageList}
                        >

                            {
                                // itemData
                                data?.offer_followup_images?.map((ImageItem: any, i: number) => {
                                    if (i < 4) {
                                        return (
                                            <ImageListItem
                                                key={i}
                                                // cols={setCols(i + 1)}
                                                >
                                                <img
                                                    src={ImageItem?.file || ImageItem}
                                                    alt={ImageItem?.title || i}
                                                    // onClick={() => openCarousel && openCarousel(ImageItem, item.id)}
                                                />
                                                {
                                                    data?.offer_followup_images?.length > 4 && i === 3 &&
                                                    // itemData.length > 4 && i === 3 &&
                                                    <ImageListItemBar
                                                        // title={`+ ${itemData.length - 4}`}
                                                        title={`+ ${data?.offer_followup_images?.length - 4}`}
                                                    />
                                                }
                                            </ImageListItem>
                                        )
                                    }
                                })}

                        </ImageList>
                    </div>

                    {/* <div className="follow_img">
                        <img src={Image} alt="Image" />
                    </div> */}
                </div>
            ))}
        </>
    )
}

export default FollowUp
