import React, {Component} from 'react';
import {addInstitution} from "../store/actions/institutionsActions";
import connect from "react-redux/es/connect/connect";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core";

const styles = () => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: 8,
        marginRight: 8,
        width: 300,
        display: "flex",
        lexWrap: "wrap"
    },
    dense: {
        marginTop: 19,
    },
    content: {
        width: 300,
    },
    card: {
        minWidth: 300,
        width: "fit-content",
        flexDirection: "column",
        marginTop: "10%"
    },
    typography_h4: {
        marginLeft: 8
    }
});

class AddInstitution extends Component {

    state = {
        title: "",
        description: "",
        user: "this.props.user._id",
        image: null,
    };

    handleChange = () => {
      console.log("HandleChange")
    };

    submitFormHandler = e => {
        e.preventDefault();
        if (this.state.image) {
            let formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    formData.append(key, this.state[key]);
                }
            });
            this.props.addRecipe(formData);
        } else {
            this.props.addRecipe(this.state)
        }
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4" color="inherit" className={classes.typography_h4}>
                        Add recipe
                    </Typography>
                    <form className={classes.container} autoComplete onSubmit={this.submitFormHandler}>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username"
                            defaultValue=""
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="dense"
                            autoFocus
                        />

                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            defaultValue=""
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="dense"
                        />

                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            defaultValue=""
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="dense"
                        />

                        <TextField
                            id="image"
                            name="image"
                            type="file"
                            className={classes.textField}
                            onChange={this.fileChangeHandler}
                            margin="dense"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{marginTop: "20px", float: "right"}}
                        >
                            Add
                        </Button>

                    </form>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    institutions: state.recipes.recipes
});

const mapDispatchToProps = dispatch => ({
    addRecipe: (recipeData) => dispatch(addInstitution(recipeData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddInstitution);