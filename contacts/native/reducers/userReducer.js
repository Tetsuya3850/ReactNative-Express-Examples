import { fetchUserContact } from "../utils/api";

const FETCHING_USER = "FETCHING_USER";
const FETCHING_USER_ERROR = "FETCHING_USER_ERROR";
const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";

export const handleFetchUser = () => async dispatch => {
  dispatch({ type: FETCHING_USER });
  try {
    let user = await fetchUserContact();
    dispatch({ type: FETCHING_USER_SUCCESS, user });
  } catch (e) {
    dispatch({
      type: FETCHING_USER_ERROR
    });
  }
};

const initialState = {
  isFetchingUser: false,
  user: {},
  userError: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFetchingUser: true
      };
    case FETCHING_USER_ERROR:
      return {
        ...state,
        isFetchingUser: false,
        userError: true
      };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        userError: false,
        user: action.user
      };
    default:
      return state;
  }
};

export default userReducer;
