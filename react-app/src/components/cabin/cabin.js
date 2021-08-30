import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteCabinsThunk, editCabinsThunk, getCabinsThunk } from '../../store/cabin.js';
import { useParams, useHistory } from 'react-router-dom';


function OneCabin(cabin) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(0);
    const [beds, setBeds] = useState(0);
    const [description, setDescription] = useState('');


    const deleteClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteCabinsThunk(id));
        history.push('/');
        // setTimeout(() => {
        // }, 500);
    }
    const cabinUpdate = async (e) => {
        e.preventDefault();
       await dispatch(editCabinsThunk(id, {
            hostId: user.Id,
            name,
            price,
            guests,
            beds,
            description
        }))
        history.push('/');
    }
    useEffect(()=>{
        dispatch(getCabinsThunk());
    },[name,price,guests,beds,description])
    let editDom = (
        <form className='formstyle' onSubmit={cabinUpdate}>
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
                        placeholder={cabin.name}
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
            <button className='addCabinButton' type='submit'>Update Cabin</button>
        </form>
    )
    return (
        <>
            <div className='deleteCabin'>
                <button onClick={deleteClick}>Delete</button>
            </div>
            {editDom}


        </>
    )
}

export default OneCabin;
