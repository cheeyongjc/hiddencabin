import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../store/users.js';
import { addCabinThunk } from '../../store/cabin';
import { useHistory, Redirect } from 'react-router-dom';
import './cabinForm.css';

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
    const [image, setImage] = useState('');

    // useEffect(() => {
    //     dispatch(getUsers());
    // }, [dispatch]);

    const cabinSubmit = async (e) => {
        e.preventDefault();
        let cab = await dispatch(addCabinThunk({
            hostId: user.id,
            name,
            price,
            guests,
            beds,
            description,
            image
        }))
        if (cab) {
            setErrors(cab);
        }
    };

    if (!errors.map) {
        return <Redirect to='/' />;
    }

    return (
        <div className='cabinFormContainer'>
            <form onSubmit={cabinSubmit} className='cabinForm'>
                <div className='cabinFormErrors'>
                    {errors.map && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='cabinFormDiv cabinNameDiv'>
                    <label>
                        Cabin name:
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>

                <div className='cabinFormDiv cabinPriceDiv'>
                    <label>
                        Price per night: $
                        <input
                            type='integer'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                </div>

                <div className='cabinFormDiv cabinGuestsDiv'>
                    <label>
                        Maximum number of guests:
                        <input
                            type='integer'
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        />
                    </label>
                </div>

                <div className='cabinFormDiv cabinBedsDiv'>
                    <label>
                        Number of beds:
                        <input
                            type='integer'
                            value={beds}
                            onChange={(e) => setBeds(e.target.value)}
                        />
                    </label>
                </div>

                <div className='cabinFormDiv cabinDescriptionDiv'>
                    <label>
                        Description:
                        <input
                            type='textarea'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>

                <div className='cabinFormDiv cabinImageDiv'>
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
