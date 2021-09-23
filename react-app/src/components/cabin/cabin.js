import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCabinsThunk, editCabinsThunk, getCabinsThunk, getOneCabinThunk } from '../../store/cabin.js';
import { deleteReviewThunk, editReviewThunk, getReviewsThunk } from '../../store/review.js';
import { useParams, useHistory } from 'react-router-dom';
import ReviewForm from '../review/reviewForm.js';
import './cabin.css';

function OneCabin() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const oneCabin = useSelector(state => state.cabins);
    const [review, setReview] = useState('');
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(0);
    const [beds, setBeds] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const deleteClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteCabinsThunk(id));
        history.push('/');
        // setTimeout(() => {
        // }, 500);
    };

    const deleteReviewClick = async (e, id) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(id));
        window.location.reload();
        // setTimeout(() => {
        // }, 500);
    };

    const cabinUpdate = async (e) => {
        e.preventDefault();
        let cab = await dispatch(editCabinsThunk(id, { hostId: user.Id, name, price, guests, beds, description, image }))
        if (cab) {
            setErrors(cab)
        } else {
            history.push('/');
        }
    };

    const reviewUpdate = async (e, id, userId, cabinId) => {
        e.preventDefault();
        let rev = await dispatch(editReviewThunk(id, { userId: userId, cabinId: cabinId, review }))
        if (rev) {
            setErrors(rev)
        } else {
            window.location.reload();
        }
    };
    useEffect(() => {
        dispatch(getOneCabinThunk(id))
    }, [dispatch, name, price, guests, beds, description, image])

    useEffect(() => {
        dispatch(getReviewsThunk())
    }, [review])

    // useEffect(() => {
    //     dispatch(getCabinsThunk());
    // }, [name, price, guests, beds, description, image])

    // ********************************************EDIT CABIN ************************************************************************
    let editDom = (
        <form className='editCabinForm' onSubmit={cabinUpdate}>
            <div className='errorsContainer'>
                {errors.map ?? errors.map((error, ind) => (
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
                    Price per night: $
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
            <button className='updateCabinButton' type='submit'>Update Cabin</button>
        </form>
    )

    // ********************************************EDIT REVIEW ************************************************************************
    let editReviewDom = (
        <div className='reviewUpdateContainer'>
            <form className='reviewUpdateForm' >
                <div className='errorsContainer'>
                    {errors.map ?? errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>

                <div>
                    <label>
                        Review:
                        <input
                            type='textarea'
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </label>
                </div>


            </form>
        </div>
    )
    // ********************************************RENDER ************************************************************************

    return (
        <div className='oneCabinContainer'>
            <img src={oneCabin?.oneCabin?.image} className='oneCabinImage' alt='oneCabinImage' />
            <div className='oneCabinName oneCabinDiv'>
                Cabin Name: {oneCabin?.oneCabin?.name}
            </div>
            <div className='oneCabinPrice oneCabinDiv'>
                Price per night: ${oneCabin?.oneCabin?.price}
            </div>
            <div className='oneCabinGuests oneCabinDiv'>
                Maximum number of guests: {oneCabin?.oneCabin?.guests}
            </div>
            <div className='oneCabinBeds oneCabinDiv'>
                Number of beds: {oneCabin?.oneCabin?.beds}
            </div>
            <div className='oneCabinDescription oneCabinDiv'>
                Description: {oneCabin?.oneCabin?.description}
            </div>
        </div>
        // <ul className='oneCabinContainer'>
        //     {cabins.map((cabin) => {
        //         if (cabin?.id === parseInt(id)) {
        //             return (
        //                 <div key={cabin.id} className='oneCabinImage'>
        //                     <img src={cabin.image} alt='cabinImage' />
        //                     <div className='oneCabinDiv oneCabinName'>
        //                         Cabin name: {cabin.name}
        //                     </div>
        //                     <div className='oneCabinDiv oneCabinPrice'>
        //                         Price per night: ${cabin.price}
        //                     </div>
        //                     <div className='oneCabinDiv oneCabinGuests'>
        //                         Maximum number of guests allowed: {cabin.guests}
        //                     </div>
        //                     <div className='oneCabinDiv oneCabinBeds'>
        //                         Number of beds: {cabin.beds}
        //                     </div>
        //                     <div className='oneCabinDiv oneCabinDescription'>
        //                         Description: {cabin.description}
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     })}
        // </ul>
        // <>
        //     <div className='deleteCabin'>
        //         <button onClick={deleteClick}>Delete</button>
        //     </div>
        //     {editDom}

        //     {ReviewForm}
        //     <div className='reviewList'>
        //         {revs.map(rev => {
        //             if (rev.cabinId == id) {
        //                 return (
        //                     <div className='singleReview' key={rev.id}>
        //                         <div>
        //                             Review: {rev.review}
        //                         </div>
        //                         <div className='deleteReview'>
        //                             <button onClick={e => deleteReviewClick(e, rev.id)}>Delete Review</button>
        //                             {editReviewDom}
        //                             <button onClick={e => reviewUpdate(e, rev.id, rev.userId, rev.cabinId)}>update Review</button>
        //                         </div>
        //                     </div>
        //                 )
        //             }
        //         })}
        //     </div>
        // </>
    )
}

export default OneCabin;
