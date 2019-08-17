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

    const {changeHandler, easy_to_make, quick_to_make, taste} = props;
    const classes = useStyles();
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">

                <div className={classes.rating1}>
                    <Rating
                        name="easy_to_make"
                        value={easy_to_make}
                        precision={0.5}
                        onChange={(e, newValue) => {
                            changeHandler(e, newValue);
                        }}
                    />
                    <Box ml={2}>{`Easy to make ${easy_to_make}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating
                        name="quick_to_make"
                        value={quick_to_make}
                        precision={0.5}
                        onChange={(e, newValue) => {
                            changeHandler(e, newValue);
                        }}

                    />
                    <Box ml={2}>{`Quick to make ${quick_to_make}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating
                        name="taste"
                        value={taste}
                        precision={0.5}
                        onChange={(e, newValue) => {
                            changeHandler(e, newValue);
                        }}
                    />
                    <Box ml={2}>{`Taste ${taste}`}</Box>
                </div>

            </Box>
        </div>
    );
};

