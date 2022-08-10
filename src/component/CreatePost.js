import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../features/createPostSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const CreatePost = () => {

    const [inputField, setInputField] = useState({
        title: "",
        content: "",
        image: "",
        showImg: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputHandler = (e) => {
        const { name, value } = e.target
        setInputField({ ...inputField, [name]: value })

    }
    const handlePostSubmit = async (e) => {

        e.preventDefault()
        try {
            //debugger

            if (!inputField.title && !inputField.image) {
                toast.error("please add a title")
            } else if (!inputField.content) {
                toast.error("please add a content")
            }
            else {
                debugger
                const formData = new FormData()
                formData.append("title", inputField.title)
                formData.append("content", inputField.content)
                console.log(inputField)
                formData.append("image", inputField.image)

                const token = localStorage.getItem('token')
                if (token) {
                    // const AuthStr = 'Bearer '.concat(token);
                    //    debugger
                    //  let response = await axios.post('http://localhost:4000/posts/createpost', formData, { headers: headers })

                    //   let response = await axios.post('http://localhost:4000/posts/createpost',
                    //   {
                    //     formData,
                    //           headers: {

                    //                   'content-type': 'multipart/form-data',
                    //                   'Authorization': AuthStr
                    //           },

                    //   })

                    //   debugger

                    let res = await dispatch(createPost({ formData, token }))
                    // console.log('api response', res)
                    clearState()

                } else {
                    navigate("/login")
                }

            }

        } catch (error) {
            // debugger
            console.log(error)
            alert("something went wrong")
        }

    }
    const clearState = () => {
        setInputField({
            title: "",
            content: "",
            image: ""

        });
    };


    const imageUpload = (event) => {
        // debugger

        // for (let i = 0; i < files.length; i++) {

        //     reader.readAsDataURL(files[i])
        //     reader.onload = () => {

        //         setInputField({ ...inputField, image: files[i], showImg: reader.result })
        //     };
        //     reader.onerror = error => {
        //         console.log("Error: ", error);
        //     };
        // }
        const files = event.target.files
        for (let element of files) {
            const reader = new FileReader()
            // display the values
            console.log(element);
            
            reader.readAsDataURL(element)
            reader.onload = () => {

                setInputField({ ...inputField, image: element, showImg: reader.result })
            };
            reader.onerror = error => {
                console.log("Error: ", error);
            };

        }



    }

    return (
        <>
            <h1 style={{ color: "chocolate", padding: "8px", marginTop: "5px", fontSize: "30px" }}>Create Post</h1>
            {/* textAlign: "center" */}
            <div className="card" style={{ width: "800px", alignSelf: "flex-start", marginTop: "20px", marginLeft: "20px" }}>
                <form encType="multipart/form-data" method="post">
                    <div className="card-body">
                        <div className="form-floating">
                            <input type="text" className="form-control" name="title" value={inputField.title} onChange={inputHandler} placeholder="Title" style={{ width: "400px", height: "50px" }} /><br></br>
                            <label htmlFor="floatingTextarea2" style={{ fontSize: "12px" }}>Title</label>
                            <div className="form-floating">
                                <textarea className="form-control" value={inputField.content}
                                    name="content" onChange={inputHandler} placeholder="Leave a comment here" id="floatingTextarea2" style={{ width: "500px" }}></textarea>
                                <label htmlFor="floatingTextarea2" style={{ fontSize: "12px" }}>create your post here</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label style={{ fontSize: "12px" }} htmlFor="formFileSm" className="form-label">select your post from here</label>
                            <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={imageUpload} style={{ width: "200px" }} multiple />
                        </div>

                        <div className="" >
                            <img src={inputField.showImg} alt="imgs" width="150" height="150" />
                        </div>
                    </div>

                    <div className='card-footer'>
                        <button onClick={handlePostSubmit} className='btn btn-primary' >Post</button>
                        <ToastContainer />
                    </div>
                </form>
            </div>



        </>
    )
}
export default CreatePost
