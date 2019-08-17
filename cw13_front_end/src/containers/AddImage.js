import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    root: {
        padding: 12,
        marginTop: "2%",
        width: "90%",
        clearfix: {
            overflow: "auto"
        }
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    }
});

class AddImage extends Component {
    state = {
        recipe: this.props.recipeId,
        image: null
    };

    fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    submitFormHandler = e => {
        e.preventDefault();
        console.log(this.state);
        if (this.state.image) {
            let formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    formData.append(key, this.state[key]);
                }
            });
            this.props.addImage(formData);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <form className={classes.container} onSubmit={this.submitFormHandler} >
                    <input className="file_input" type="file" name="image" id="image"
                           onChange={this.fileChangeHandler}/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{marginTop: "0", height: "28px"}}>
                        Add
                    </Button>
                </form>
            </Paper>
        )
    };
};

export default withStyles(styles)(AddImage);