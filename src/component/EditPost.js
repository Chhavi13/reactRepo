import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';

const EditPost = () => {
    const navigate = useNavigate()
    let { id } = useParams()
   

    const [inputField, setInputField] = useState({
        title: "",
        content: "",
        image: ""
    })
   
       

    const inputHandler = (e) => {
        const { name, value } = e.target
        setInputField({ ...inputField, [name]: value })
        console.log(inputField)
    }


    const imageUpload = (event) => {
        console.log(event.target.files[0])
        setInputField({ ...inputField, image: event.target.files[0] })
    }
    const handlePostSubmit = async (e) => {
        e.preventDefault()
       
        const formData = new FormData()

        if(inputField.image && inputField.image.name){
            formData.append("image", inputField.image, inputField.image.name)
        }
    
        formData.append("title", inputField.title )
        formData.append("content", inputField.content )
        console.log(formData)
      
        try {
            //  debugger
            const token = localStorage.getItem('token')
            if (token) {
                const AuthStr = 'Bearer '.concat(token);
                const headers = {
                    'content-type': 'application/json',
                    Authorization: AuthStr
                }
                let response = await axios.put(`http://localhost:5000/posts/updatepost/${id}`, formData,{ headers: headers })
                console.log("*****************",response)
                clearState()
                // toast.success("post upadated successfully")                      
                navigate("/showpost")
              
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


   
    const fetchData = async (id) => {
        try {
            console.log("post get", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            let url = `http://localhost:4000/posts/editpost/${id}`
            if (token) {

                const AuthStr = 'Bearer '.concat(token);
                axios.get(url, { headers: { Authorization: AuthStr } })
                    .then(response => {

                        // If request is good...
                        console.log("(((((((((((((((((((((", response.data);
                        setInputField(
                            response.data

                        )


                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });

            } else {
                navigate("/login")
            }

        } catch (error) {
            navigate("/login")
            console.log(error)
        }
    }

    useEffect(() => {
        if (id)
        fetchData(id);
    }, [id]);


    return (
        <>
        <h1 style={{  color: "chocolate",padding: "8px",marginTop:"5px" ,fontSize:"30px"}}>Update Post</h1>
        <div className="card" style={{ width: "800px", alignSelf: "flex-start", marginTop: "30px", marginLeft: "20px" }}>
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

export default EditPost