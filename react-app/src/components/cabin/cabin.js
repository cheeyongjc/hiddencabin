import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/users.js';
import { deleteCabinsThunk } from '../../store/cabin.js';
import { useParams, useHistory } from 'react-router-dom';


function OneCabin() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const cabin = useSelector(state => state.session.cabin);
    const { id } = useParams();

    const deleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteCabinsThunk(id));
        setTimeout(() => {
            history.push('/');
        }, 500);
    }

    // let editDeleteDom;
    // if (user?.id == cabin?.hostId) {
    //     editDeleteDom = (

    //     )
    // }
    return (
        <>
            <div className='deleteCabin'>
                <button onClick={deleteClick}>Delete</button>
            </div>
            {/* <div className='editCabin'>
                <button onClick={editClick}>Edit</button>
            </div> */}
        </>
    )
}

export default OneCabin;
