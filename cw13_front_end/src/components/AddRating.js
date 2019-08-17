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

export default function AddRating(props) {

    const {changeHandler, food_quality, service_quality, interior} = props;
    const classes = useStyles();
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">

                <div className={classes.rating1}>
                    <Rating
                        name="food_quality"
                        value={food_quality}
                        precision={0.5}
                        onChange={(e, newValue) => {
                            changeHandler(e, newValue);
                        }}
                    />
                    <Box ml={2}>{`Easy to make ${food_quality}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating
                        name="service_quality"
                        value={service_quality}
                        precision={0.5}
                        onChange={(e, newValue) => {
                            changeHandler(e, newValue);
                        }}

                    />
                    <Box ml={2}>{`Quick to make ${service_quality}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating
                        name="interior"
                        value={interior}
                        precision={0.5}
                        onChange={(e, newValue) => {
                            changeHandler(e, newValue);
                        }}
                    />
                    <Box ml={2}>{`Taste ${interior}`}</Box>
                </div>

            </Box>
        </div>
    );
};

