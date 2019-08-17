import {FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE} from "../actions/imageActions";


const initialState = {
    images: null,
    error: null
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IMAGES_SUCCESS:
            return {...state, images: action.images};

        case FETCH_IMAGES_FAILURE:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default imagesReducer;