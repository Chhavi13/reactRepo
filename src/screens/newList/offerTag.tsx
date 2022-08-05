import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Header } from '../../components/header/header'
import "./offerTag.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getTitleTag } from '../../services/offer.service';
import { CREATE_OFFER_OBJECT } from '../../redux/action/actionTypes/getOfferActionsTypes';
import { find } from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FreeSoloCreateOptionDialog from '../../components/postHashTag/postHashTag';

interface IProps { }

export const OfferTag: React.FC<IProps> = () => {
  let [primaryTags, setPrimaryTags] = useState<any>([])
  let [secondaryTag, setSecondaryTag] = useState<any>([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const params: any = useParams();

  const createOfferStoreData = useSelector((state: any) => {
    return state?.getOfferReducer?.data;
  });
  const genralTags = createOfferStoreData?.general_tag;

  let [ideasTags, setIdeasTags] = useState<any>(genralTags ? genralTags : []);

  const getTagsList = async () => {
    try {
      let response: any = await getTitleTag();
      const titleTagsData: any = response?.data;
      let primaryTags = titleTagsData.filter((tag: any) => tag.tag_type === 'Primary');
      let secondaryTags = titleTagsData.filter((tag: any) => tag.tag_type === 'Secondary');

      secondaryTags.map((item: any) => {
        if (item?.name === "Buy" || item?.name === "Gain") {
          item.background = "#67CA92"
        }
        if (item?.name === "Sell" || item?.name === "Loss" || item?.name === "News") {
          item.background = "#FF8C8C"
        }
        if (item?.name === "Yolo") {
          item.background = "#2F80ED"
        }
        if (item?.name === "Analysis") {
          item.background = "#F69475"
        }
        if (item?.name === "Learn") {
          item.background = "#F2C94C"
        }
        if (item?.name === "Meme") {
          item.background = "#5D5FEF"
        }
        if (item?.name === "Discuss") {
          item.background = "#D3B0EE"
        }
        if (item?.name === "Chart") {
          item.background = "#3E4480"
        }
        return item;
      })

      createOfferStoreData?.primary_tag && setIsActive(primaryTags, createOfferStoreData.primary_tag)
      createOfferStoreData?.secondary_tag && setIsActive(secondaryTags, createOfferStoreData.secondary_tag)
      setPrimaryTags(primaryTags);
      setSecondaryTag(secondaryTags);

    } catch (err: any) {
      console.log("get Offer Error", err)
    }
  }

  useEffect(() => {
    if (params?.tag_name === 'activity-label' || params?.tag_name === 'asset-label') {
      getTagsList();
    }
  }, []);

  function setIsActive(data: any, item: any) {
    return data.map((x: any) => {
      if (x.id === item.id) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
      return x;
    });
  }

  const updateOfferStore = (data: any, name: string) => {
    const obj = find(data, ['isActive', true]);
    let newState = {};
    newState = { ...createOfferStoreData, [name]: { id: obj.id, name: obj.name, icon: obj?.icon, background: obj?.background } };
    dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
  }

  const onChangePrimaryTags = (item: any) => {

    const newArray = setIsActive(primaryTags, item);
    setPrimaryTags(newArray);
    updateOfferStore(newArray, 'primary_tag');
    history.goBack();
  }

  const onChangeSecondaryTags = (item: any) => {
    const newArray = setIsActive(secondaryTag, item);
    //debugger
    setSecondaryTag(newArray);
    updateOfferStore(newArray, 'secondary_tag');
    history.goBack();
  }

  const handleDelete = (index: number) => {
    ideasTags.splice(index, 1);
    console.log(ideasTags);
    setIdeasTags([...ideasTags]);
    let newState = {};
    newState = { ...createOfferStoreData, 'general_tag': ideasTags };
    dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
    // setFormData({ ...formData, ...newState });
  };

  const inputOnChange = (event: any) => {
    let tag: string = event.target.value.trim();
    if (event.key === ' ') {
      if (tag.charAt(0).includes('$')) {
        const newTages = [...ideasTags, tag];
        setIdeasTags([...ideasTags, tag]);
        let newState = {};
        newState = { ...createOfferStoreData, 'general_tag': newTages };
        dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
        // setFormData({ ...formData, ...newState });
      }
      event.target.value = null;
    }
  };

  const hashTagHandler = (event: any) => {
    let tag: string = event;
    let ideaobj = ideasTags.find((iddata:any) => iddata === tag);
    if(ideaobj){
      alert('Tag Already Added!');
    }else{
    if (tag && tag.charAt(0).includes('$')) {
      const newTages = [...ideasTags, tag];
      //alert('Tag Added!');
      setIdeasTags([...ideasTags, tag]);
      let newState = {};
      newState = { ...createOfferStoreData, 'general_tag': newTages };
      dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
      
    }
    //console.clear();
   }
  };
  return (
    <>
      <div className="mobilemaincontainer content">
        <div className="mobile_container dash_tabs">
          <div className="sabrinamainscroll create_page">
            <Header
              title="Tag"
              back={true}
              enableback={() => history.goBack()}
              next="Add"
              enablenext={() => history.goBack()}
            />
            <br />
            <div className="form_body">
              <div className="about-yourselfdiv">
                {
                  params?.tag_name === 'asset-label' &&
                  <>
                    <h3 className="text-left">Tags</h3>
                    <div className="grey-contentarea">
                      {
                        primaryTags.map((item: any, i: number) => (
                          <Chip
                            onClick={() => onChangePrimaryTags(item)}
                            key={i}
                            className={`chips chip_avatar ${item?.isActive ? 'active' : ''}`}
                            avatar={<Avatar alt="img" src={item.icon} />}
                            label={item.name}
                          />
                        ))}
                    </div>
                  </>
                }
                {
                  params?.tag_name === 'activity-label' &&
                  <div className="about-yourselfdiv">
                    {/* <h3 className="text-left">Add secondary tag</h3> */}
                    <div className="grey-contentarea">
                      {secondaryTag.map((item: any, i: number) =>
                        (
                          <Chip
                            style={{ color: 'white', backgroundColor: item?.background, textAlign: 'center' }}
                            onClick={() => onChangeSecondaryTags(item)}
                            key={i}
                            className={`chips chip_avatar active ${item?.isActive ? "active" : ""}`}
                            label={item.name}
                          />

                        )
                      )}
                    </div>
                  </div>
                }

                {
                  params?.tag_name === 'asset-tag' && ideasTags.map((item: any, index: number) => {
                    return (
                      <>
                        <Chip
                          className="asset-tag-chips"
                          onDelete={() => handleDelete(index)}
                          label={item}
                          variant="outlined"
                        />
                        <span>&nbsp;</span>
                      </>
                    );
                  })
                }

                {
                  params?.tag_name === 'asset-tag' &&

                  <div className="box_list">
                    <Row>
                      <Col md={12} xs={12}>
                        <FreeSoloCreateOptionDialog setHashTagHandler={hashTagHandler} />
                        {/* <InputLabel htmlFor="input-with-icon-adornment">Ideas tag...</InputLabel>
                        <Input
                          className="w-100 textarea_input_div"
                          multiline
                          placeholder="Create $ Tags"
                          value={ideasTagsInputVal}
                          onKeyPress={inputOnChange}
                          id="input-with-icon-adornment"
                          startAdornment={ideasTags.map((item: any, index: number) => {
                            return (
                              <>
                                <Chip
                                  onDelete={() => handleDelete(index)}
                                  label={item}
                                  variant="outlined"
                                />
                                <span>&nbsp;</span>
                              </>
                            );
                          })}
                        /> */}
                      </Col>
                    </Row>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}