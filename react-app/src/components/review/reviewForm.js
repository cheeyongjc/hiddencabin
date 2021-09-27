import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { addReviewThunk, getReviewsThunk } from '../../store/review';

const ReviewForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    // const cabin = useSelector(state => state.cabins);
    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState('');

    const reviewSubmit = async (e) => {
        e.preventDefault();
            let data = await dispatch(addReviewThunk({
                userId: user.id,
                cabinId: id,
                review
            }))
            const dataArray = Object.entries(data)
            if (data) {
                // console.log(dataArray, 'so i can see')
                setErrors(data)
            }
    }
    useEffect(() => {
        dispatch(getReviewsThunk())
    }, [dispatch, review])

    return (
        <div className='reviewFormContainer'>
            <form className='reviewForm' onSubmit={reviewSubmit}>
                <div>
                    {
                        errors.map && errors.map((error) => (<div key={error}>{error}</div>))
                    }
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

                <button className='addReviewButton' type='submit'>Add Review</button>
            </form>
        </div>
    )
}
export default ReviewForm;
