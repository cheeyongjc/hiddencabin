const LOAD = 'cabin/';
const ADD = 'cabin/ADD';
const EDIT = 'cabin/EDIT';
const DELETE = 'cabin/DELETE';

const loadCabin = cabins => ({
    type: LOAD,
    cabins
});

const addCabin = (cabin) => ({
    type: ADD,
    cabin
});

const editCabin = (cabin) => ({
    type: EDIT,
    cabin
});

const deleteCabin = (cabin) => ({
    type: DELETE,
    cabin
});


export const getCabinsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/cabins/`);
    const cabins = await res.json();
    dispatch(loadCabin(cabins));
};

export const addCabinThunk = payload => async dispatch => {
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
        console.log('ERROR', err)
    }
}

export const deleteCabinsThunk = (id) => async dispatch => {
    const res = await fetch(`/api/cabins/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (res.ok) {
        dispatch(deleteCabin(id))
    }
}

const initialState = {}
const cabinReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newCabins = {};
            action.cabins.cabins.forEach(cabin => {
                newCabins[cabin.id] = cabin;
            });
            return newCabins;
        case ADD:
            const newState = {
                ...state,
                [action.cabin.id]: action.cabin,
            };
            return newState;
        case DELETE:
            const cabinToDelete = { ...state }
            delete cabinToDelete[action.cabin.message]
            return cabinToDelete;
        case EDIT:
            return {
                ...state,
                ...action.cabin
            }
        default:
            return state;
    }
}

export default cabinReducer;
