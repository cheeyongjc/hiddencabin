import React from 'react';
import { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import { getCabinsThunk, editCabinsThunk } from '../../store/cabin';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'


function EditCabin() {
    const cabins = useSelector(state => state.cabins)
    const cabinsArray = Object.values(cabins);
    const currentCabin = cabinsArray.filter((cabin) => cabin.id === Number(id))
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(0);
    const [beds, setBeds] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const { id } = useParams();
    useEffect(() => {
        dispatchEvent(getCabinsThunk)
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cabinSubmit = await dispatch(editCabinsThunk(id, { hostId: user.Id, name, price, guests, beds, description, image }))
        if(cabinSubmit){
            setErrors(cabinSubmit)
        }else{
            history.push(`/`)
        }
    }
    return (
        <div className='editCabinContainer'>
        <form className='editCabinForm' onSubmit={handleSubmit}>
            <div className='editCabinErrorsContainer'>
                {errors.map && errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>

            <div className='editCabinDiv'>
                <label>
                    Cabin name:
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>

            <div className='editCabinDiv'>
                <label>
                    Price per night: $
                    <input
                        type='integer'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
            </div>

            <div className='editCabinDiv'>
                <label>
                    Maximum number of guests:
                    <input
                        type='integer'
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                    />
                </label>
            </div>

            <div className='editCabinDiv'>
                <label>
                    Number of beds:
                    <input
                        type='integer'
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                    />
                </label>
            </div>

            <div className='editCabinDiv'>
                <label>
                    Description:
                    <input
                        type='textarea'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>

            <div className='editCabinDiv'>
                <label>
                    Image URL:
                    <input
                        type='text'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
            </div>
            <button className='updateCabinButton' type='submit'>Update Cabin</button>
        </form>
        </div>
    )
}

export default EditCabin;
