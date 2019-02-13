import { fetchContacts } from "../utils/api";

const FETCHING_CONTACTS = "FETCHING_CONTACTS";
const FETCHING_CONTACTS_ERROR = "FETCHING_CONTACTS_ERROR";
const FETCHING_CONTACTS_SUCCESS = "FETCHING_CONTACTS_SUCCESS";

export const handleFetchContacts = () => async dispatch => {
  dispatch({ type: FETCHING_CONTACTS });
  try {
    let contacts = await fetchContacts();
    dispatch({ type: FETCHING_CONTACTS_SUCCESS, contacts });
  } catch (e) {
    dispatch({
      type: FETCHING_CONTACTS_ERROR
    });
  }
};

const initialState = {
  isFetchingContacts: false,
  contacts: [],
  contactsError: false
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CONTACTS:
      return {
        ...state,
        isFetchingContacts: true
      };
    case FETCHING_CONTACTS_ERROR:
      return {
        ...state,
        isFetchingContacts: false,
        contactsError: true
      };
    case FETCHING_CONTACTS_SUCCESS:
      return {
        ...state,
        isFetchingContacts: false,
        contactsError: false,
        contacts: action.contacts
      };
    default:
      return state;
  }
};

export default contactsReducer;
