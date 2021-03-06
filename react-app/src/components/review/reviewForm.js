import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { addReviewThunk, getReviewsThunk } from '../../store/review';
import './reviewForm.css';

const ReviewForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    // const cabin = useSelector(state => state.cabins);
    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState('');
    const revs = useSelector(state => {
        return Object.values(state.reviews);
    });
    const userReview = revs.filter((oneReview) => oneReview.userId === user?.id && oneReview.cabinId === +id);
    const reviewSubmit = async (e) => {
        if (!user) {
            history.push(`/login`);
        } else {
            e.preventDefault();
            let data = await dispatch(addReviewThunk({
                userId: user.id,
                cabinId: id,
                review
            }))
            if (data) {
                setErrors(data)
                setReview('');
            }
        }
    }
    useEffect(() => {
        dispatch(getReviewsThunk(id))
    }, [dispatch, review, id])

    return (
        <>
            {userReview.length === 0 ?
                <div className='reviewFormContainer'>
                    <form className='reviewForm' onSubmit={reviewSubmit}>
                        <div className='reviewFormErrors'>
                            {
                                errors.map && errors.map((error) => (<div key={error}>{error}</div>))
                            }
                        </div>
                            <label className='reviewName'>
                                Leave a review:
                            </label>
                            <input className='reviewInput'
                                type='textarea'
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        <button className='addReviewButton' type='submit'>Add Review</button>
                    </form>
                </div>
                :
                null
            }
        </>
    )
}
export default ReviewForm;
