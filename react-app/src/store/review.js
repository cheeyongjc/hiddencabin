const LOAD_REVIEWS = 'reviews/loadReview'
const LOAD_ONE_REVIEW = 'reviews/loadOneReview'
const ADD_REVIEW = 'reviews/addReview'
const EDIT_REVIEW = 'reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const loadOneReview = (reviews) => ({
    type: LOAD_ONE_REVIEW,
    review
});

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});

export const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
});

export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
});


export const getReviewsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/reviews/`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(loadReviews(reviews));
    }
};
 export const 
