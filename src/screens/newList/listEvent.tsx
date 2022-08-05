import { useParams } from "react-router-dom";
import "./listEvent.scss";
import TabIcon from '../tabs/tabs';
import { isLogin } from '../../utils';
import { OfferDetail } from '../../components/offerDetail/offerDetail';


export const ListEvent = (props: any) => {
  const params: any = useParams();
  
  
  // const query = useQuery();
  // const useQuery = () => {
  //   return new URLSearchParams(window.location.search);
  // }


  // const getOfferList = async () => {
  //   console.log('get')
  //   const response: any = await authService.getOfferListSingle(params?.id);
  //   // console.log(response)
  //   if(response?.data && response?.data?.data?.event_offer_images){
  //     response.data['images'] = response.data.event_offer_images
  //     setData(response?.data?.data);
  //     setImages(response?.data?.data?.event_offer_images)
  //     console.log(response.data)
  //   } else{
  //     console.log('error')
  //   }
  // }


  // useEffect(() => {
  //   // console.log('pp',params)
  //   if (params?.id) {
  //     getOfferList();
  //   } else {
  //     console.log(props.sendData)
  //     setData(props.sendData)
  //     setImages(props.images)
  //   }
  // },[setData]);

  // const redirectToBuy = () => {
  //   history.push(`/buy-now/${params.id}`);
  // }

  // useEffect(()=>{
  //   props.sendData['event_offer_images']=props.images
  // },[])



  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs pb-5">

        <div className="pt-2">

          <OfferDetail item={props.sendData} sliderImages={props.images} isPreview={props?.isPreview} stepperCase={2} params={params.id}/>
        </div>
        {isLogin() && <TabIcon />}

      </div>
    </div >
  )
}