import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../features/createPostSlice';
import { useDispatch } from 'react-redux';

const CreatePost = () => {

    const [inputField, setInputField] = useState({
        title: "",
        content: "",
        image: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputHandler = (e) => {
        const { name, value } = e.target
        setInputField({ ...inputField, [name]: value })
        console.log(inputField)
    }
    const handlePostSubmit = async (e) => {
        //debugger
        e.preventDefault()
        try {
            console.log("============", inputField.image)
            const formData = new FormData()
            formData.append("image", inputField.image, inputField.image.name)
            formData.append("title", inputField.title)
            formData.append("content", inputField.content)
            console.log("+++++++++++", formData)


            debugger
            const token = localStorage.getItem('token')
            if (token) {
                const AuthStr = 'Bearer '.concat(token);
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

                let res = await dispatch(createPost({formData, AuthStr}))
                console.log('api response', res)
                clearState()

            } else {
                navigate("/login")
            }

        } catch (error) {
            //  debugger
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
        console.log(event.target.files[0])
        setInputField({ ...inputField, image: event.target.files[0] })
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
                            <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={imageUpload} style={{ width: "200px" }} />
                        </div>
                    </div>

                    <div className='card-footer'>
                        <button onClick={handlePostSubmit} className='btn btn-primary' >Post</button>
                    </div>
                </form>
            </div>



        </>
    )
}
export default CreatePost
