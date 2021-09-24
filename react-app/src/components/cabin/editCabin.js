import React from 'react';
import { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import { getCabinsThunk, editCabinsThunk } from '../../store/cabin';
import { useSelector, useDispatch } from 'react-redux'
import './editCabin.css';

function EditCabin() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const cabins = useSelector(state => {
        return Object.values(state.cabins)
    });
    const oneCabin = cabins.filter((cabin) => cabin.id === +id);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(oneCabin[0]?.name);
    const [price, setPrice] = useState(oneCabin[0]?.price);
    const [guests, setGuests] = useState(oneCabin[0]?.guests);
    const [beds, setBeds] = useState(oneCabin[0]?.beds);
    const [description, setDescription] = useState(oneCabin[0]?.description);
    const [image, setImage] = useState(oneCabin[0]?.image);

    useEffect(() => {
        dispatch(getCabinsThunk(id))
    }, [name, price, guests, beds, description, image])
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cabinSubmit = await dispatch(editCabinsThunk(id, { hostId: user.Id, name, price, guests, beds, description, image }))
        if(cabinSubmit){
            setErrors(cabinSubmit)
        }
    }
    if (!errors.map) {
        history.push(`/cabins/${id}`);
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
