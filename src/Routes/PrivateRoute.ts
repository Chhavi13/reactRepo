import { Home } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { HOME, LOGIN, VERIFYEMAIL } from './RouteConstent';

export const PrivateRoute = (props: any) => {

    const { Component } = props
    const navigate = useNavigate();
    useEffect(() => {
        // let token = localStorage.getItem('Nurture_user_token')
        let user: any = localStorage.getItem("Nurture_user_data");
        user = JSON.parse(user)
        if (!user) {
            navigate(LOGIN)
        }
        if(user?.is_email_verify === 0){
            navigate(VERIFYEMAIL)
        }
        // if(user user?.is_email_verify === 1){
        //     navigate(LOGIN)
        // }
    })

    return Component
}
