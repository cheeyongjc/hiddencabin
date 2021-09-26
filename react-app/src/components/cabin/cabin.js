import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCabinsThunk, editCabinsThunk, getCabinsThunk } from '../../store/cabin.js';
import { deleteReviewThunk, editReviewThunk, getReviewsThunk } from '../../store/review.js';
import { useParams, useHistory } from 'react-router-dom';
import ReviewForm from '../review/reviewForm.js';
import './cabin.css';

function OneCabin() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const cabins = useSelector(state => {
        return Object.values(state.cabins);
    });
    const revs = useSelector(state => {
        return Object.values(state.reviews);
    });
    const oneCabin = cabins.filter((cabin) => cabin.id === +id);
    const [review, setReview] = useState('');
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

    const cabinUpdate = async (e, id) => {
        e.preventDefault();
        let cab = await dispatch(editCabinsThunk(id, { hostId: user.Id, name, price, guests, beds, description, image }))
        if (cab) {
            setErrors(cab)
        }
    };

    const reviewUpdate = async (e, id, userId, cabinId) => {
        e.preventDefault();
        let rev = await dispatch(editReviewThunk(id, { userId: userId, cabinId: cabinId, review }))
        if (rev) {
            setErrors(rev)
        }
    };
    const handleEdit = (e) => {
        history.push(`/cabins/edit/${id}`);
    }
    const handleReviewEdit = (e) => {
        history.push(`/cabins/review/edit/${id}`);
    }
    useEffect(() => {
        dispatch(getReviewsThunk())
    }, [dispatch, review])

    useEffect(() => {
        dispatch(getCabinsThunk(id))
    }, [dispatch, name, price, guests, beds, description, image])


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
        <>
            <div className='editDeleteContainer'>
                {
                    oneCabin[0]?.hostId === user?.id ?
                        <>
                            <button className='editCabinButton editDeleteButton' onClick={handleEdit}>Edit</button>
                            <button className='deleteCabinButton editDeleteButton' onClick={deleteClick}>Delete</button>
                        </>
                        :
                        null
                }
            </div>
            <div className='oneCabinImageContainer'>
                <img src={oneCabin[0]?.image} alt='cabinImage' className='oneCabinImage' />
            </div>

            <div className='oneCabinContainer'>

                <h1 className='oneCabinName oneCabinDiv'>
                    {oneCabin[0]?.name}
                </h1>
                <div className='oneCabinPrice oneCabinDiv'>
                    Price per night: ${oneCabin[0]?.price}
                </div>
                <div className='oneCabinGuests oneCabinDiv'>
                    Maximum number of guests: {oneCabin[0]?.guests}
                </div>
                <div className='oneCabinBeds oneCabinDiv'>
                    Number of beds: {oneCabin[0]?.beds}
                </div>
                <div className='oneCabinDescription oneCabinDiv'>
                    Description: {oneCabin[0]?.description}
                </div>

            </div>

            <div className='reviewList'>
                {revs.map(review => {
                    if (review.cabinId === parseInt(id) && review.userId === user.id){
                        return (
                            <div className='singleReview' key={review.id}>
                                <div className='reviewDiv'>
                                    {review.review}
                                </div>
                            </div>
                        )
                    }

                })}

            </div>
        </>

        //         {ReviewForm}
        //         <div className='reviewList'>
        //             {revs.map(rev => {
        //                 if (rev.cabinId == id) {
        //                     return (
        //                         <div className='singleReview' key={rev.id}>
        //                             <div>
        //                                 Review: {rev.review}
        //                             </div>
        //                             <div className='deleteReview'>
        //                                 <button onClick={e => deleteReviewClick(e, rev.id)}>Delete Review</button>
        //                                 {editReviewDom}
        //                                 <button onClick={e => reviewUpdate(e, rev.id, rev.userId, rev.cabinId)}>update Review</button>
        //                             </div>
        //                         </div>
        //                     )
        //                 }
        //             })}
        //         </div>
        //     </>
        // </>
    )
}

export default OneCabin;
