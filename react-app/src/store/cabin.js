const LOAD_CABIN = 'cabin/';
const ADD_CABIN = 'cabin/addCabin';
const EDIT_CABIN = 'cabin/editCabin';
const DELETE_CABIN = 'cabin/deleteCabin';

const loadCabin = (cabins) => ({
    type: LOAD_CABIN,
    cabins
});

const addCabin = (cabin) => ({
    type: ADD_CABIN,
    cabin
});

const editCabin = (cabin) => ({
    type: EDIT_CABIN,
    cabin
});

const deleteCabin = (cabin) => ({
    type: DELETE_CABIN,
    cabin
});


export const getCabinsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/cabins/`);
    if (res.ok) {
        const cabins = await res.json();
        if (cabins.errors) {
            return;
        }
        dispatch(loadCabin(cabins));
    }
};

export const addCabinThunk = (payload) => async (dispatch) => {
    const res = await fetch(`/api/cabins/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        const cabin = await res.json();
        dispatch(addCabin(cabin));
        return cabin;
    } else {
        let err = await res.json();
        if (err.errors) {
            return err.errors;
        }
    }
};

export const deleteCabinsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/cabins/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (res.ok) {
        dispatch(deleteCabin(id))
    }
};

export const editCabinsThunk = (id, payload) => async (dispatch) => {
    const res = await fetch(`/api/cabins/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        const cabin = await res.json();
        await dispatch(editCabin(cabin))
        return cabin;
    } else {
        const err = await res.json();
        if (err.errors) {
            return err.errors;
        }
    }
};

const initialState = {}
const cabinReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CABIN:
            const newCabins = {};
            action.cabins.cabins.forEach(cabin => {
                newCabins[cabin.id] = cabin;
            });
            return newCabins;
        case ADD_CABIN:
            const newState = {
                ...state,
                [action.cabin.id]: action.cabin,
            };
            return newState;
        case DELETE_CABIN:
            const cabinToDelete = { ...state }
            delete cabinToDelete[action.cabin.message]
            return cabinToDelete;
        case EDIT_CABIN:
            return {
                ...state,
                ...action.cabin
            }
        default:
            return state;
    }
};

export default cabinReducer;
