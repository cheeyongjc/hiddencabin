import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../store/user.js';
import { useParams, useHistory } from 'react-router-dom';
import '.cabin.css';

const CabinForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(0);
    const [beds, setBeds] = useState(0);
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const cabinSubmit = async (e) => {
        e.preventDefault();
        dispatch(addCabin({
            hostId: user?.id,
            name,
            price,
            guests,
            beds,
            description
        }))
        history.push('/');
    };
    return(
        <div className='formStyle formContainer'>
        <form className='formstyle' onSubmit={cabinSubmit}>

        </form>
        </div>
    )
}
