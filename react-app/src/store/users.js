const LOAD = 'get/users/';

const load = users => ({
  type: LOAD,
  users
});

export const getUsers = () => async (dispatch) => {
  const res = await fetch('/api/users/');
  const users = await res.json();
  dispatch(load(users));
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD:
      const newUsers = { ...state };
      action.users.users.forEach(user => {
        newUsers[user.id] = user;
      });
      return newUsers;
    default:
      return state;
  }
}

export default usersReducer;
