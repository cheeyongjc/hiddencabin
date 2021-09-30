import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCabinsThunk, getCabinsThunk } from '../../store/cabin.js';
import { deleteReviewThunk, editReviewThunk, getReviewsThunk } from '../../store/review.js';
import { useParams, useHistory } from 'react-router-dom';
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
    const userReview = revs.filter((oneReview) => oneReview.userId === user?.id && oneReview.cabinId === +id);
    // const [review] = useState('');
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(0);
    const [beds, setbeds] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [editReview, setEditReview] = useState('');
    const [showEditReview, setShowEditReview] = useState(false);


    const deleteClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteCabinsThunk(id));
        history.push('/');
        // setTimeout(() => {
        // }, 500);
    };
    const editReviewUpdate = async (e) => {
        e.preventDefault();
        let payload = {
            review: editReview,
            cabinId: id,
            userId: user.id,
            id: userReview[0].id
        }
        let rev = await dispatch(editReviewThunk(payload))
        if (rev) {
            setErrors(rev)
            if (!errors.map)
                setShowEditReview(false);
        }
    };

    const handleEdit = (e) => {
        history.push(`/cabins/edit/${id}`);
    }
    useEffect(() => {
        dispatch(getReviewsThunk(id))
    }, [dispatch, editReview, id])

    useEffect(() => {
        dispatch(getCabinsThunk(id))
    }, [dispatch, name, price, guests, beds, description, image])

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
                                    <button className='editReviewButton editDeleteReviewButton' onClick={() => {
                                        showEditReview === false ? setShowEditReview(true) : setShowEditReview(false)
                                        setEditReview(userReview[0].review)
                                    }}>Edit</button>
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

            {showEditReview &&
                <div className='editReviewFormContainer'>
                    <form className='editReviewForm' onSubmit={editReviewUpdate}>
                        <div className='editReviewFormErrors'>
                            {
                                errors.map && errors.map((error) => (<div key={error}>{error}</div>))
                            }
                        </div>
                        <div className='editReviewNameDiv'>
                            <label>
                                Edit your review:
                            </label>
                        </div>
                        <div className='editReviewInputDiv'>
                            <input className='editReviewInput'
                                type='textarea'
                                value={editReview}
                                onChange={(e) => setEditReview(e.target.value)}
                            />
                        </div>
                        <button className='updateEditReviewButton' type='submit'>Update Review</button>
                    </form>
                </div>
            }


        </>
    )
}

export default OneCabin;
