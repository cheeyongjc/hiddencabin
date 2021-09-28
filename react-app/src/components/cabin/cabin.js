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
    const [showEditReview, setEditReview] = useState(false);

    const deleteClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteCabinsThunk(id));
        history.push('/');
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
        dispatch(getReviewsThunk(id))
    }, [dispatch, review, id])

    useEffect(() => {
        dispatch(getCabinsThunk(id))
    }, [dispatch, name, price, guests, beds, description, image])


    // ********************************************EDIT REVIEW ************************************************************************
    let editReview = (
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

            <div className='reviewListContainer'>
                <h1 className='reviewHeading'> Reviews</h1>
                <div className='reviewList'>
                    {revs.map(review => {
                        if (review.cabinId === parseInt(id) && review?.userId === user?.id) {
                            const deleteReviewClick = async () => {
                                await dispatch(deleteReviewThunk(review.id));
                            };
                            return (
                                <div key={review.id} className='reviewDiv'>
                                    {review.review}
                                    <button className='editReviewButton editDeleteReviewButton' onClick={handleReviewEdit}>Edit</button>
                                    <button className='deleteReviewButton editDeleteReviewButton' onClick={deleteReviewClick}>Delete</button>
                                </div>
                            )
                        } else if (review.cabinId === parseInt(id)) {
                            return (
                                <div key={review.id} className='reviewDiv'>
                                    {review.review}
                                </div>
                            )
                        }
                    })}
                </div>
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
