import React, { useCallback, useState, useRef, useEffect } from 'react'
import { getOrientation } from 'get-orientation/browser';
import { Modal } from 'react-bootstrap'
import Typography from '@material-ui/core/Typography';
import { Slider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, withStyles } from '@material-ui/core';
import Cropper from 'react-easy-crop';
import BackupIcon from '@material-ui/icons/Backup';
import AttachmentIcon from '@material-ui/icons/Attachment';
import RefreshIcon from '@material-ui/icons/Refresh';
import { getCroppedImg, getRotatedImage } from "./canvasUtils"
import { ORIENTATION_TO_ANGLE } from "./ORIENTATION_TO_ANGLE";
import Compressor from 'compressorjs';
import "../../App.css"
const BorderLinearProgress = withStyles((theme:any) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

// Convert file to base64
export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const UploadImage = ({ show, isToggleUploadPic, getCroppedImage, progress,
  uploadingFile, setUploadingFile, inputAccept = 'image/*', cropShape = 'rect', getVideoURI,upload, setUpload }: any, props: any) => {

  
  const mediaInputFile: any = useRef();
  const [imageSrc, setImageSrc] = useState<any>();
  const [videoUploading, setVideoUploading] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedImage, setCroppedImage] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imgName, setimgName] = useState<any>({})
  // const [compressedFile, setCompressedFile] = useState(null);
 
  const showCroppedImage = useCallback(async () => {

    uploadingFile = true;
    (uploadingFile) && setUploadingFile(true);

    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        imgName
      )

      const thumbmailFile = await compressFileThumbmail(croppedImage);
      const originalFile = await compressFileOriginal(croppedImage);

      getCroppedImage(thumbmailFile, originalFile);
      // onClose();
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null);
    setUploadingFile(false);
    setImageSrc(null);
    setUpload(false)
  }, []);

  useEffect(() => {
    upload && onClose()
  }, [upload])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, []);

  // compressor file size - thumbmail
  function compressFileThumbmail(file: any) {
    return new Promise((resolve) => {
      new Compressor(file, {
        quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          const blobToFile = new File([compressedResult], imgName.name, { type: imgName.type });
          resolve(blobToFile);
        },
      });
    })
  }
  // compressor file size - original
  function compressFileOriginal(file: any) {
    return new Promise((resolve) => {
      new Compressor(file, {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          const blobToFile = new File([compressedResult], imgName.name, { type: imgName.type });
          resolve(blobToFile);
        },
      });
    })
  }

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoUploading(false)
      if (file.type.includes('video')) {
        // setVideoSrc(imageDataUrl);
        setVideoUploading(true);
        getVideoURI(file);
        // onClose();
      } else {
        let imageDataUrl = await readFile(file);
        setimgName(file);
        // apply rotation if needed
        try {
          const orientation = await getOrientation(file)
          const rotation = ORIENTATION_TO_ANGLE[orientation];
          if (rotation) {
            const rotateFile = await getRotatedImage(imageDataUrl, rotation, file.name);
            imageDataUrl = await readFile(rotateFile);
          }
        } catch (e) {

        }
        setImageSrc(imageDataUrl);
      }

    }
  }

  return (

    <div>
      <Modal className="cropmodal" show={show} onHide={isToggleUploadPic} >
        <div className="cropImage">

        {(progress > 0 && videoUploading) &&
            <Box className="mb25" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <BorderLinearProgress variant="determinate" value={progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">
                  {`${progress}%`}
                </Typography>
              </Box>
            </Box>
          }

          {imageSrc && (
            <React.Fragment>
              <div className="crop-container">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={cropShape === 'rect' ? 4 / 3 : 4 / 4}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  objectFit="contain"
                  cropShape={cropShape}
                />
              </div>
              <div className={props.controls}>
                <br />
                {progress > 0 &&
                  <Box className="mb25" display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                      <BorderLinearProgress variant="determinate" value={progress} />
                    </Box>
                    <Box minWidth={35}>
                      <Typography variant="body2" color="textSecondary">
                        {`${progress}%`}
                      </Typography>
                    </Box>
                  </Box>
                }

                <div className="zooming_container">
                  <div className={props.sliderContainer}>
                    {/* important code */}
                    {/* <Typography
                      props={{root:props.sliderLabel}}
                      Zoom
                    >
                    </Typography> */}

                    <Typography >
                      Zoom
                    </Typography>
                    {/* important code */}

                    {/* <Slider
                      defaultValue={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      props={{ root: props.slider }}
                      onChange={(e, zoom) => setZoom(zoom)}
                    /> */}
                    <Slider
                      key={`slider-${1}`}
                      defaultValue={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e: any, zoom: any) => setZoom(zoom)}
                    />

                  </div>
                </div>

                <div className="zooming_container">
                  <div >
                    {/* important code */}

                    {/* <Typography
                        variant="overline"
                        props={{ root: props.sliderLabel }}>
                        Rotation
                    </Typography> */}
                    <Typography
                      variant="overline">
                      Rotation
                    </Typography>

                    {/* important code */}
                    {/* <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      props={{ root: props.slider }}
                      onChange={(e, rotation) => setRotation(rotation)}
                    /> */}
                    <Slider
                      key={`slider-${2}`}
                      defaultValue={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      onChange={(e: any, rotation: any) => setRotation(rotation)}
                    />
                  </div>
                </div>
                <div className="zooming_btn imguploadcontainer">
                  {/* important code */}
                  {/* <button
                    disabled={uploadingFile}
                    onClick={showCroppedImage}
                    
                    color="primary"
                    //props={{ root: props.cropButton }}>
                      <BackupIcon />
                  </button> */}
                  <button
                    disabled={uploadingFile}
                    onClick={showCroppedImage}
                    color="primary"
                  >
                    <BackupIcon />
                  </button>
                </div>
                <div className="zooming_btn imguploadcontainer refreshbtncontainer">
                  <button
                    onClick={onClose}
                    color="primary">
                    <RefreshIcon />
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
          
            <div className="inputCustom">
              <AttachmentIcon className="inputlinkicon" />
              <input
                className='media-file-upload'
                type="file"
                id="file"
                accept={inputAccept}
                ref={mediaInputFile}
                onChange={onFileChange}
              />
              <label onClick={() => mediaInputFile.current.click()}>Choose a file</label>
            </div>
          
        </div>
      </Modal>
    </div>

  )
}

export default UploadImage;