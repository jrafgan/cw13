import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {arraySum} from "../constants";

export default function ReadOnlyRating(props) {

    const [value] = React.useState({
        food_quality: arraySum(props.data.map(rating=>rating.food_quality)),
        service_quality: arraySum(props.data.map(rating=>rating.service_quality)),
        interior: arraySum(props.data.map(rating=>rating.interior
        )),
    });

    const average = () => ((value.food_quality + value.service_quality + value.interior) / 3).toFixed(1);
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Avarage ratings</Typography>
                <Rating value={(value.food_quality + value.service_quality + value.interior) / 3} readOnly />
                <Typography gutterBottom >
                    ({`${average()},  ${props.data.length} Reviews`})
                </Typography>
            </Box>
        </div>
    );
}
