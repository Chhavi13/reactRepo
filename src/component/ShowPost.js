import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


const ShowPost = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    console.log("state", state)
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
                        // console.log("only postid aarhi h puri detail ni arhi h post table ki ", response);
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
            // console.log("post like ", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            let url = "http://localhost:4000/posts/likes"
            if (token) {
                const AuthStr = 'Bearer '.concat(token);
                axios.put(url, { postid: id }, { headers: { Authorization: AuthStr } }
                )
                    .then(response => {
                        // If request is good...
                        // console.log("(((((((((((((((((((((", response);
                        const newData = data.map(item => {
                            // console.log('error ' + response.data._id);
                            // console.log('============ ' + item._id);
                            if (item._id === response.data._id) {
                                return response.data
                            } else {
                                return item
                            }
                        })
                        setData(newData)
                        // console.log("newdata", newData)
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
                        // console.log("(((((((((((((((((((((", response);
                        //setData(response.data)

                        const newData = data.map(item => {
                            // console.log('error ' + response.data._id);
                            // console.log('============ ' + item._id);

                            if (item._id === response.data._id) {
                                return response.data
                            } else {
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

    const makeComment = (text, postid) => {
        try {

            console.log("post comments", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            let url = "http://localhost:4000/posts/comments"
            if (token) {

                const AuthStr = 'Bearer '.concat(token);
                axios.put(url, { body: { postid, text } }, { headers: { Authorization: AuthStr } })
                    .then(response => {

                        // If request is good...
                        console.log("(((((((((((((((((((((", response);
                        setData(response.data)

                        const newData = data.map(item => {
                            // console.log('error ' + response.data._id);
                            // console.log('============ ' + item._id);

                            if (item._id === response.data._id) {
                                return response.data
                            } else {
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


    const deletePost = (postid) => {
        try {

            console.log("post delete", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            let url = `http://localhost:4000/posts/deletepost/${postid}`
            if (token) {

                const AuthStr = 'Bearer '.concat(token);
                axios.delete(url, { headers: { Authorization: AuthStr } })
                    .then(response => {

                        // If request is good...
                        console.log("(((((((((((((((((((((", response.data.result._id);
                        const newData =data.filter(item=>{
                            return item._id !== response.data.result._id
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
    // const editPost = (postid) => {
    //     try {

    //         console.log("post delete", localStorage.getItem('token'))
    //         const token = localStorage.getItem('token')
    //         let url = `http://localhost:4000/posts/editpost/${postid}`
    //         console.log(url)
    //         // if (token) {

    //         //     const AuthStr = 'Bearer '.concat(token);
    //         //     axios.put(url, { headers: { Authorization: AuthStr } })
    //         //         .then(response => {

    //         //             // If request is good...
    //         //             console.log("(((((((((((((((((((((", response.data.result._id);
    //         //             const newData =data.filter(item=>{
    //         //                 return item._id !== response.data.result._id
    //         //             })
    //         //             setData(newData)

    //         //         })
    //         //         .catch((error) => {
    //         //             console.log('error ' + error);
    //         //         });

    //         // } else {
    //         //     navigate("/login")
    //         // }

    //     } catch (error) {
    //         navigate("/login")
    //     }
    // }
    return (
        <>
            <div className="card" style={{ marginTop: "50px", marginLeft: "30px" }} >

                <div className="card-body"style={{ marginTop: "50px", marginLeft: "20px" }}>

                    {data.map((item) => {
                         debugger
                        return (
                            
                            <div className="card" key={item._id} >
                                {console.log("????",item)}
                                     <div style={{  marginLeft: "20px" }}>
                            <span><h6 style={{ marginLeft: "5px", marginTop: "10px", color: "black" }}>{item.postedBy.name}</h6></span>
                                <h4 ><span style={{ marginLeft: "10px", fontFamily: 'fantasy', color: 'darkred' }} ></span><span style={{ color: "darkslateblue" }}>{item.title}{item.postedBy.id == state.id && <i className="large material-icons" style={{ marginLeft:"480px"}} onClick={()=>navigate(`/posts/editpost/${item._id}`)} >edit</i>} <span style={{ color: "darkslateblue" }}>{item.postedBy.id == state.id && <i className="large material-icons" onClick={()=>deletePost(item._id)} >delete</i>}</span></span></h4>
                          
                                <div ><img src={item.image} alt="image" style={{ maxWidth: '50%', marginLeft: "10px" }} /></div><br></br>
                                <p ><span style={{ marginLeft: "10px", fontFamily: 'fantasy', color: 'darkred' }} ></span><span style={{ color: "darkslateblue" }}><span style={{ color: "black" }}>{item.postedBy.name}</span>&nbsp;{item.content}</span></p>
                                <div style={{ marginLeft: "15px", height: "30px", color: "blue", maxwidth: "40%" }}>
                                    {item.likes.includes(state?._id)
                                        ? <i className="large material-icons" onClick={() => { unlikepost(item._id) }}>thumb_down</i>
                                        :
                                        <i className="large material-icons" onClick={() => { likepost(item._id) }} >thumb_up</i>
                                    }
                                </div>
                                <h6>{(item.likes.length)} like</h6>
                                {

                                    item.comments.map(record => {

                                        return <h6 key={record._id}><span style={{ fontWeight: "500",marginLeft:"10px" }}>{record.postedBy.name}</span>&nbsp;<span style={{ fontWeight: "400" }}>{record.text}</span ></h6>
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                    e.target[0].value = "";

                                }}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control"
                                            id="floatingTextarea2" style={{ maxWidth: '50%' }} />
                                        <label htmlFor="floatingTextarea2" style={{ fontSize: "12px" }}>Add a comment..</label>
                                    </div>
                                </form>
<br></br>
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