import { useSelector, useDispatch } from 'react-redux';
import React, {  useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {editReviewThunk, getReviewsThunk} from '../../store/review.js';


function EditReview(){

    const dispatch = useDispatch();
    const {id, cabinId} = useParams;



    useEffect(() => {
        dispatch(getReviewsThunk());
    }, [review])
}
