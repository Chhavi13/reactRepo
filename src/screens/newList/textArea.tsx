import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
// import { BackContext } from '../newList/stepper';
import { Header } from '../../components/header/header';
import "./textArea.scss";
import { useSelector, useDispatch } from "react-redux"
import { CREATE_OFFER_OBJECT } from '../../redux/action/actionTypes/getOfferActionsTypes';

export const Textarea = (props: any) => {
  const history = useHistory();
  const dispatch =useDispatch();
  const param: any = useParams();
  const [textareaPlaceHolder, setTextareaPlaceHolder] = useState<string>();
  const [value,setValue] = useState<string>()

  const createOfferStoreData = useSelector((state: any) => {
    return state?.getOfferReducer?.data;
  });


  const onPageBack = () => {
    history.goBack()
  }

  useEffect(() => {
    if (param.value === 'notes') {
      setTextareaPlaceHolder('Add notes')
      createOfferStoreData?.additional_notes && setValue(createOfferStoreData.additional_notes)
    } else if (param.value === 'thanku') {
      setTextareaPlaceHolder('Thank you')
      createOfferStoreData?.thanku_note && setValue(createOfferStoreData.thanku_note) 
    }
  }, [param]);


  const handleSave = () => {
    let name:string=textareaPlaceHolder === 'Add notes'? 'additional_notes' :'thanku_note';
    dispatch({ type: CREATE_OFFER_OBJECT, payload: { ...createOfferStoreData, [name]: value } });
    history.push('/create/offer')
  }

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs">

        {/* <NextContext.Provider value={{ enablefunction: handleSave }}> */}
          {/* <BackContext.Provider value={{ enableback: onPageBack }}> */}
            <Header 
            title={textareaPlaceHolder} 
            back={true} 
            next={'Save'}
            enablenext={handleSave} 
            enableback={onPageBack}
            />
          {/* </BackContext.Provider> */}
        {/* </NextContext.Provider> */}

        <div className="textarea-container">
          <TextField
            autoFocus
            className="textbox"
            id="outlined-multiline-static"
            label={textareaPlaceHolder}
            multiline
            rows={15}
            defaultValue=""
            variant="outlined"
            value={value}
            onChange={(e)=>{setValue(e.target.value)}}
          />
        </div>
      </div>
    </div>
  )
}