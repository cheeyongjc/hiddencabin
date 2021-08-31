import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../store/users.js';
import {addCabinThunk} from '../../store/cabin';
import { useHistory } from 'react-router-dom';
import './cabin.css';

const CabinForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(0);
    const [beds, setBeds] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] =useState('');

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const cabinSubmit = async (e) => {
        e.preventDefault();
       const data = await dispatch(addCabinThunk({
            hostId: user?.id,
            name,
            price,
            guests,
            beds,
            description,
            image
        }))
        history.push('/');
    };
    return (
        <div className='formStyle formContainer'>
            <div className='addCabinTitle'><h2>Add a Cabin</h2></div>
            <form className='formstyle' onSubmit={cabinSubmit}>
                <div className='errorsContainer'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>

                <div>
                    <label>
                        Cabin name:
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Price per night:
                        <input
                            type='integer'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Maximum number of guests:
                        <input
                            type='integer'
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Number of beds:
                        <input
                            type='integer'
                            value={beds}
                            onChange={(e) => setBeds(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Description:
                        <input
                            type='textarea'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Image URL:
                        <input
                            type='text'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>
                </div>

                <button className='addCabinButton' type='submit'>Add Cabin</button>
            </form>
        </div>
    )
}

export default CabinForm;
