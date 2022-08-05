import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/index';

const PublicRoute: React.FC<any> = ({
    component: Component,
    ...rest
  }) => {
    
    return ( 
        <Route {...rest} render={props => {
            if( isLogin() ) {


                return <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
            }

            return <Component {...props} />

        }} />
    );
}

export default PublicRoute;