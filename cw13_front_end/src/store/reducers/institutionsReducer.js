import {
    FETCH_INSTITUTION_SUCCESS,
    FETCH_INSTITUTIONS_SUCCESS, FETCH_INSTITUTIONS_FAILURE} from "../actions/institutionsActions";

const initialState = {
    institutions: null,
    institution: null,
    error: null
};

const institutionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INSTITUTIONS_SUCCESS:
            return {...state, institutions: action.institutions};

        case FETCH_INSTITUTION_SUCCESS:
            return {...state, institution: action.institution};

        case FETCH_INSTITUTIONS_FAILURE:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default institutionsReducer;