import axios from '../../axios-api';
import {push} from "connected-react-router";

export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

export const fetchImagesSuccess = images => ({type: FETCH_IMAGES_SUCCESS, images});
export const fetchImagesFailure = error => ({type: FETCH_IMAGES_FAILURE, error});

export const addImage = (imageData) => {
    console.log(imageData);
    return dispatch => {
        return axios.post("/images/", imageData).then(
            response => {
                dispatch(push('/'));
            },
            error => {
                if (error.response) {
                    dispatch(fetchImagesFailure(error.response.data));
                } else {
                    dispatch(fetchImagesFailure({global: "No network connection "}))
                }
            });
    };
};

export const getImages = id => {
    return dispatch => {
        let path = '/images';

        if (id) {
            path += '?institution=' + id;
        }
        return axios.get(path).then(
            response => {
                dispatch(fetchImagesSuccess(response.data));
            });
    }
};

export const deleteImage = id => {
    return dispatch => {
        return axios.delete('/images?id=' + id).then(
            response => {
                dispatch(fetchImagesSuccess(response.data));
            });
    };
};


