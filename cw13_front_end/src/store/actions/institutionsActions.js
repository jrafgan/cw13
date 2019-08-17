import axios from '../../axios-api';
import {push} from "connected-react-router";

export const FETCH_INSTITUTIONS_SUCCESS = 'FETCH_INSTITUTIONS_SUCCESS';
export const FETCH_INSTITUTION_SUCCESS = 'FETCH_INSTITUTION_SUCCESS';
export const FETCH_INSTITUTIONS_FAILURE = 'FETCH_INSTITUTIONS_FAILURE';

export const fetchInstitutionsSuccess = institutions => ({type: FETCH_INSTITUTIONS_SUCCESS, institutions});
export const fetchInstitutionSuccess = institution => ({type: FETCH_INSTITUTION_SUCCESS, institution});
export const fetchInstitutionsFailure = error => ({type: FETCH_INSTITUTIONS_FAILURE, error});

export const getInstitutions = id => {
    return dispatch => {
        let path = '/institutions';

        if (id) {
            path += '?user=' + id;
        }
        return axios.get(path).then(
            response => {
                dispatch(fetchInstitutionsSuccess(response.data));
            });
    }
};

export const getInstitution = id => {
    return dispatch => {
        return axios.get('/institutions/' + id).then(
            response => {
                dispatch(fetchInstitutionSuccess(response.data));
            });
    };
};

export const addInstitution = recipeData => {
    return dispatch => {
        return axios.post('/institutions', recipeData).then(
            response => {
                dispatch(push('/'));
            },
            error => {
                if (error.response) {
                    dispatch(fetchInstitutionsFailure(error.response.data));
                } else {
                    dispatch(fetchInstitutionsFailure({global: "No network connection "}))
                }
            });
    };
};

export const deleteInstitution = id => {
    return dispatch => {
        return axios.delete('/institutions?id=' + id).then(
            response => {
                dispatch(fetchInstitutionsSuccess(response.data));
            });
    };
};


