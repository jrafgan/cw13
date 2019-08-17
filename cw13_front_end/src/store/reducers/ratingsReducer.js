import {
    FETCH_RATING_SUCCESS,
    FETCH_RATINGS_SUCCESS,
    FETCH_RATING_FAILURE
} from "../actions/ratingsActions";

const initialState = {
    ratings: null,
    rating: null,
    error: null
};

const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RATINGS_SUCCESS:
            return {...state, ratings: action.ratings};

        case FETCH_RATING_SUCCESS:
            return {...state, rating: action.rating};

        case FETCH_RATING_FAILURE:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default ratingsReducer;