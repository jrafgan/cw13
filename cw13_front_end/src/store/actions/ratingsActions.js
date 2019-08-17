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

export const addRating = ratingData => {
    return (dispatch, getState) => {
        console.log(ratingData);
        const data = {
            institution: ratingData.institution,
            user: getState().users.user._id,
            food_quality: ratingData.food_quality,
            service_quality: ratingData.service_quality,
            interior: ratingData.interior,
            comment: ratingData.comment
        }
        return axios.post('/ratings', data).then(
            response => {
                dispatch(getRatings(ratingData.institution));
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


