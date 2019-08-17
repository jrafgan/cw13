import axios from '../../axios-api';

export const FETCH_RATINGS_SUCCESS = 'FETCH_RATINGS_SUCCESS';
export const FETCH_RATING_SUCCESS = 'FETCH_RATING_SUCCESS';
export const FETCH_RATING_FAILURE = 'FETCH_RATING_FAILURE';

export const fetchRatingsSuccess = ratings => ({type: FETCH_RATINGS_SUCCESS, ratings});
export const fetchRatingSuccess = rating => ({type: FETCH_RATING_SUCCESS, rating});
export const fetchRatingFailure = error => ({type: FETCH_RATING_FAILURE, error});

export const getRatings = id => {
    return dispatch => {
        let path = '/ratings';

        if (id) {
            path += '?institution=' + id;
        }
        return axios.get(path).then(
            response => {
                dispatch(fetchRatingsSuccess(response.data));
            });
    }
};

export const getRating = id => {
    console.log(id);
    return dispatch => {
        return axios.get('/ratings/' + id).then(
            response => {
                dispatch(fetchRatingSuccess(response.data));
            });
    };
};

export const addRating = ratingData => {
    return dispatch => {
        return axios.post('/ratings', ratingData).then(
            response => {
                dispatch(getRating(ratingData.recipe));
            },
            error => {
                if (error.response) {
                    dispatch(fetchRatingFailure(error.response.data));
                } else {
                    dispatch(fetchRatingFailure({global: "No network connection "}))
                }
            });
    };
};

export const deleteRating = id => {
    return dispatch => {
        return axios.delete('/ratings?id=' + id).then(
            response => {
                dispatch(fetchRatingsSuccess(response.data));
            });
    };
};


