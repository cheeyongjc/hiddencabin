import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './demo.css';

export default function Demo() {
    const dispatch = useDispatch();
    const demoLogin = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'))
        window.location.replace('/')
    }
    return (
        <button className='demoButton' onClick={(e) => demoLogin(e)}>Demo</button>
    )
}
