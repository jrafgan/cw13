import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    rating1: {
        width: 300,
        display: 'flex',
        alignItems: 'center',
    },
});

export default function UserRating(props) {
    const [value] = React.useState({
        food_quality: props.rating.food_quality,
        service_quality: props.rating.service_quality,
        interior: props.rating.interior
    });
    const classes = useStyles();
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">

                <div className={classes.rating1}>
                    <Rating value={value.food_quality} readOnly/>
                    <Box ml={2}>{`Food quality ${value.food_quality}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating value={value.service_quality} readOnly/>
                    <Box ml={2}>{`Service quality ${value.service_quality}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating value={value.interior} readOnly/>
                    <Box ml={2}>{`Interior ${value.interior}`}</Box>
                </div>

            </Box>
        </div>
    );
}
