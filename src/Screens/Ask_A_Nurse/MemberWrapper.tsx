import React from 'react'
import { ListGroup } from 'react-bootstrap';
import unlike from "../../Assets/img/icons/like.svg"
import Liked from "../../Assets/img/icons/liked.svg"

const MemberWrapper = (props: any) => {
    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)
    
    return (
        <div>
            {user?.membership ? props.children :

                props?.data?.map((res: any) => (
                    <ListGroup.Item className='ps-0'>
                        <div className='d-flex justify-content-between align-items-start list-inner w-100'>
                            <div className='d-flex flex-column w-100'>
                                <div className='tags-row d-flex '>
                                    {res?.tag?.map((tag: any) => (<div className='tag1 tags'
                                        style={{ backgroundColor: tag?.color_code }}
                                    >{tag?.name}</div>))}
                                </div>
                                <div className='askN-questions mb-3'><p>{res?.question}</p></div>
                                {/* <div className='askN-description'><p>{res?.answer}</p></div> */}
                                <div className='d-flex justify-content-between'>
                                    <div className='askN-likes d-flex align-items-center' ><img src={res?.like ? Liked : unlike} alt="like" />
                                        <span className="like-count">{res?.like_count}</span>
                                    </div>

                                    <div className='faq-readmore-container'>
                                        <button className="btn faq-readmore" >Read more</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ListGroup.Item>
                ))

            }

        </div>
    )
}

export default MemberWrapper