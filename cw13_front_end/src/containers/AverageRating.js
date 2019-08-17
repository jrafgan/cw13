import React, {Component} from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {arraySum} from "../constants";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    rating1: {
        width: 300,
        display: 'flex',
        alignItems: 'center'
    }
});

class AverageRating extends Component {

    state = {
        food_quality: arraySum(this.props.rating.map(rating=>rating.food_quality)),
        service_quality: arraySum(this.props.rating.map(rating=>rating.service_quality)),
        interior: arraySum(this.props.rating.map(rating=>rating.interior))
    };

    componentDidUpdate(prevProps) {
        if(prevProps.rating !== this.props.rating) {
            this.setState({
                food_quality: arraySum(this.props.rating.map(rating=>rating.food_quality)),
                service_quality: arraySum(this.props.rating.map(rating=>rating.service_quality)),
                interior: arraySum(this.props.rating.map(rating=>rating.interior))
            })
        }
    }

    average = () => ((this.state.food_quality + this.state.service_quality + this.state.interior) / 3).toFixed(1);

    render() {
        const {classes} = this.props;
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">

                <div className={classes.rating1}>
                    <Rating value={parseInt(this.average())} readOnly/>
                    <Box ml={2}>{`Over all ${parseInt(this.average())}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating value={this.state.food_quality} readOnly/>
                    <Box ml={2}>{`Easy to make ${this.state.food_quality.toFixed(1)}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating value={this.state.service_quality} readOnly/>
                    <Box ml={2}>{`Quick to make ${this.state.service_quality.toFixed(1)}`}</Box>
                </div>

                <div className={classes.rating1}>
                    <Rating value={this.state.interior} readOnly/>
                    <Box ml={2}>{`Taste ${this.state.interior.toFixed(1)}`}</Box>
                </div>

            </Box>
        </div>
    )};
}

export default withStyles(styles)(AverageRating);
