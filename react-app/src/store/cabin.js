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
