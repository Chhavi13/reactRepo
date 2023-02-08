import React, { useState } from 'react'
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';
// import Header from "../../Common/Header";
import Eye from "../../Assets/img/eye.svg"
import { FORGOTPASSWORD, MEMBERSHIP, SIGNUP, HOME } from '../../Routes/RouteConstent';
import { UserLogin } from '../../Service/userAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const LoginPopup = (props: any) => {
    let { isLogin, setIslogin, setIsSignup } = props;
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value
        setFormdata({
            ...formdata,
            [name]: value
        });
        setError({
            ...error,
            [name]: ""
        });
    }

    const toggleIsPasswordShowValue = () => {
        setIsPasswordShow(!isPasswordShow);
    };

    let submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!formdata.email || !formdata.password) {
                let errors: any = {}
                if (!formdata.email) {
                    errors.email = "Email is required";
                }
                if (!formdata.password) {
                    errors.password = "Password is required";
                }
                setError(errors);
            } else {
                setIsLoading(true);
                let res = await UserLogin(formdata);
                const isSuccess = res?.data?.success;
                const msgArr = res?.data?.message;
                let msg = "";
                for (let i = 0; i < msgArr.length; i++) {
                    msg += msgArr[i];
                }
                if (!isSuccess) {
                    toast.error(msg);
                }
                if (isSuccess) {

                    localStorage.setItem("Nurture_user_data", JSON.stringify(res?.data?.data));
                    localStorage.setItem("Nurture_user_token", res?.data?.data?.token);
                    setIslogin(false)
                    // navigate(MEMBERSHIP);
                    navigate(HOME);

                }

                setIsLoading(false);

            }
        } catch (error: any) {
            setIsLoading(false);
            if (error.response.status === 401) {
                let msgArr = error.response.data.message;
                let msg = "";
                for (let i = 0; i < msgArr.length; i++) {
                    msg += msgArr[i]
                }
                toast.error(msg);
            }

        }
    }





    const handleClose = (e: any, type: any) => {

        if (type === "backdropClick") {
            return;
        }

        setIslogin(false);
    };

    const openSignup = () => {
        setIslogin(false)
        setIsSignup(true)
    }
    const modalClose = () => {
        setIslogin(false)
        navigate(HOME)

    }

    return (

        <div>
            <div>
                {/* <Button variant="outlined" onClick={handleClickOpen}>
                                Open alert dialog
                            </Button> */}
                <Dialog
                    open={isLogin}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="welcome-modal modal-500"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                                    {"Use Google's location service?"}
                                </DialogTitle> */}
                    <DialogContent>
                        <IconButton sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}  >

                            <CloseIcon onClick={modalClose} />

                        </IconButton>

                        <DialogContentText id="alert-dialog-description">
                            <div>
                                {/* <Header /> */}
                                <ToastContainer />

                            </div>
                            <div className='d-flex justify-content-center flex-wrap'>
                                <h2>Welcome Back!</h2>
                                <form onSubmit={submitLogin} className="welcom-backform">
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email"
                                            value={formdata.email}
                                            className={`${error.email && "error-input"} form-control`}
                                            id="exampleInputEmail1"
                                            placeholder="Type something"
                                            onChange={handleChange}
                                        />
                                        <p className='error'>{error.email}</p>
                                    </div>
                                    <div className="form-group position-relative mb-3">
                                        <label>Password</label>
                                        <input
                                            //type="password"
                                            type={isPasswordShow ? 'text' : 'password'}
                                            name="password"
                                            value={formdata.password}
                                            className={`${error.password && "error-input"} form-control`}
                                            id="exampleInputPassword1"
                                            placeholder="Type something"
                                            onChange={handleChange}
                                        />
                                        <img src={Eye} alt="" onClick={toggleIsPasswordShowValue} className="eye-passimg" />
                                        <p className='error'>{error.password}</p>
                                    </div>
                                    <button type="submit" disabled={isLoading} className="btn sign-inbtn primary-blue-btn">{isLoading ? <CircularProgress /> : "Sign In"}</button>
                                    <div className="text-center forget-password">
                                        <Link to={FORGOTPASSWORD}>Forgot Password</Link>
                                    </div>
                                </form>
                                <div className="text-center have-account">
                                    <p>Don’t have an account? <a onClick={openSignup}>Create one</a></p>
                                    {/* <p>Return to <a onClick={openSignup}>Linked page</a></p> */}
                                </div>
                            </div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </div>


        </div>
    )
}

export default LoginPopup
