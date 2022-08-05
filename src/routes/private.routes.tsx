import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/index';


const PrivateRoute: React.FC<any> = ({
    component: Component,
    isHeader,
    ...rest
  }) => {
    return (
        <Route {...rest} render={props => {
            if( isLogin() ) {
                return(
                    <> 
                        <Component {...props} />
                    </>
                )
                
            }
            
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }} />
    );
}

export default PrivateRoute;