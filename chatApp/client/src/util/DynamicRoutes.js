import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from '../Context/auth';

export default function DynamicRoutes(props) {
    const { user } = useAuthState();

    if(props.authenticated && user){
        return <Navigate to='/login'/>
    }else if(props.guest && user){
        return <Navigate to='/Home'/>
    }else{
        return <Route component={props.component} {...props}/>
    }
}
