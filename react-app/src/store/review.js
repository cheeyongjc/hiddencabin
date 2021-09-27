const LOAD_REVIEWS = 'reviews/loadReview'
const ADD_REVIEW = 'reviews/addReview'
const EDIT_REVIEW = 'reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
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
    const res = await fetch(`/api/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(loadReviews(reviews));
    }
};


export const addReviewThunk = (payload) => async (dispatch) => {

    const res = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(addReview(review));
        return review;
    } else if (res.status < 500) {
        let err = await res.json();
        if (err.errors) {
            return err.errors;
        }
    }
};

export const deleteReviewThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (res.ok) {
        dispatch(deleteReview(id))
    }
};

export const editReviewThunk = (id, payload) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        const review = await res.json();
        dispatch(editReview(review));
        return review;
    } else {
        const err = await res.json();
        if (err.errors) {
            return err.errors;
        }
    }
};

const initialState = {}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newReviews = {};
            action.reviews.reviews.forEach(review => {
                newReviews[review.id] = review;
            });
            return newReviews;
        case ADD_REVIEW:
            const newState = {
                ...state,
                [action.review.id]: action.review,
            };
            return newState;
        case DELETE_REVIEW:
            const reviewToDelete = { ...state }
            delete reviewToDelete[action.review]
            return reviewToDelete;
        case EDIT_REVIEW:
            const newEditState = {
                ...state,
                [action.review.id]: action.review,
            };
            return newEditState;
        // return {
        //     ...state,
        //     ...action.review
        // }
        default:
            return state;
    }
};

export default reviewReducer;
