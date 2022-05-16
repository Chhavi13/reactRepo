import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';


const ShowPost = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const FetchData = async () => {


        try {
            console.log("yess home ", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            let url = "http://localhost:4000/posts/getallposts"
            if (token) {
                const AuthStr = 'Bearer '.concat(token);
                axios.get(url, { headers: { Authorization: AuthStr } })
                    .then(response => {
                        // If request is good...
                        console.log(response.data);
                        setData(response.data)
                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });
                //   })
                // console.log(response)

            } else {
                navigate("/login")
            }

        } catch (error) {
            navigate("/login")
        }
    }

    useEffect(() => {
        FetchData()
    }, [])

    const likepost = (id) => {
        try {
            console.log("post like ", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            let url = "http://localhost:4000/posts/likes"
            if (token) {
                const AuthStr = 'Bearer '.concat(token);
                axios.put(url, { postid: id }, { headers: { Authorization: AuthStr } }
                )
                    .then(response => {
                        // If request is good...
                        console.log("(((((((((((((((((((((", response);  
                        const newData =data.map(item=>{
                            console.log('error ' + response.data._id);
                            console.log('============ ' + item._id);
                            if(item._id === response.data._id){
                                return response.data
                            }else{
                                return item
                            }
                        })
                           setData(newData)
                       console.log("newdata",newData)
                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });


            } else {
                navigate("/login")
            }

        } catch (error) {
            navigate("/login")
        }
    }
    const unlikepost = (id) => {
        try {
            console.log("post unlike ", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            let url = "http://localhost:4000/posts/unlikes"
            if (token) {

                const AuthStr = 'Bearer '.concat(token);
                axios.put(url, { postid: id }, { headers: { Authorization: AuthStr } })
                    .then(response => {
                        
                        // If request is good...
                        console.log("(((((((((((((((((((((", response);
                        //setData(response.data)
                        
                        const newData =data.map(item=>{
                            console.log('error ' + response.data._id);
                            console.log('============ ' + item._id);
                            
                            if(item._id === response.data._id){
                                return response.data
                            }else{
                                return item
                            }
                        })
                           setData(newData)
                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });


            } else {
                navigate("/login")
            }

        } catch (error) {
            navigate("/login")
        }
    }


    return (
        <>
            <div className="card" style={{ marginTop: "50px", marginLeft: "30px"  }} >

                <div className="card-body">

                    {data.map((item) => {
                        //  debugger
                        return (
                            <div className="card" key={item._id} >
                                <div className="card-body" >
                                    <h4 ><span style={{ fontFamily: 'fantasy', color: 'darkred' }} >Title:-</span><span style={{ color: "darkslateblue" }}>{item.title}</span></h4>
                                </div>
                                <div ><img src={item.image} alt="image" style={{ maxWidth: '50%' }} /></div><br></br>
                                <div style={{ marginLeft: "15px", height: "30px", color: "blue", maxwidth: "40%" }}>

                                    <i className="large material-icons" onClick={() => { likepost(item._id) }} >thumb_up</i>&nbsp;&nbsp;
                                    <i className="large material-icons" onClick={() => { unlikepost(item._id) }}>thumb_down</i>
                    
                                </div>
                                <h6>{(item.likes.length)} like</h6>
                                

                                <div className="card">
                                    <div className="card-body">
                                        <p>posted By :-{item.postedBy}</p>
                                    </div>
                                </div>
                            </div>


                        )
                    })}

                </div>
            </div>
        </>
    )
}
export default ShowPost



// {data.map((item)=>{
//     return(
//         <div key={item._id}><img src={item.image} alt="image"  /></div>
//     )
// })}