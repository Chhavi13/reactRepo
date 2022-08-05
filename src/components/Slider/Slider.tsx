import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import lock from "../../assets/images/mobileimages/lock.svg";


const Sliders = (props: any) => {
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div>
      <Slider {...settings}>
        {props?.image?.map((img: any, i: any) => (
          <div key={i}>
            {img?.file ? (
              <>
                {props.item && props.item.is_private  ?
                  <>
                    <LazyLoadImage src={img?.file} 
                    effect="blur"
                      className={props.item.is_private ? 'list_bg blur-image' : 'list_bg'} 
                      
                    />
                    <div className="lockimg_section">
                      <img src={lock} className="lock_image" alt="Lock"/>
                    </div>
                  </> : 
                  <LazyLoadImage effect="blur" src={img?.file} className='list_bg' width="100%"  />
                }
              </>) :
              <img src={img} className="list_bg" alt="" />
            }
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Sliders;