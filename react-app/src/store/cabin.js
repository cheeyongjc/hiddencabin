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


export const getCabins = () => async (dispatch) => {
    const res = await fetch(`/api/cabins/`);
    const cabins = await res.json();
    dispatch(load(cabins));
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
        dispatch(add(cabin));
        return cabin;
    } else {
        let err = await res.json();
        console.log('ERROR', err)
    }
},

const initialState = {}
const cabinReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newCabins = {};
            action.cabins.cabin.forEach(pricing => {
                newCabins[cabins.id] = cabin;
            });
            return newCabins;
        default:
            return state;
    }
}

export default cabinReducer;
