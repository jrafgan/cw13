import React, {Component} from 'react';
import {addInstitution} from "../store/actions/institutionsActions";
import connect from "react-redux/es/connect/connect";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    textArea: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: 10,
        width: 300
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
        user: this.props.user._id,
        image: null,
        checked: false
    };

    submitFormHandler = e => {
        e.preventDefault();
        console.log(this.state);
        // if (this.state.image) {
        //     let formData = new FormData();
        //     Object.keys(this.state).forEach(key => {
        //         if (this.state[key] !== null) {
        //             formData.append(key, this.state[key]);
        //         }
        //     });
        //     this.props.addInstitution(formData);
        // } else {
        //     this.props.addInstitution(this.state)
        // }
    };

    handleChange = e => {
        this.setState({checked: !this.state.checked})
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
                        Add institution
                    </Typography>
                    <form className={classes.container} autoComplete onSubmit={this.submitFormHandler}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Title"
                            value={this.state.title}
                            className={classes.textField}
                            onChange={this.inputChangeHandler}
                            margin="dense"
                            autoFocus
                        />

                        <TextareaAutosize
                            required
                            className={classes.textArea}
                            name="description"
                            aria-label="description"
                            rows={3}
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.inputChangeHandler}/>

                        <TextField
                            required
                            id="image"
                            name="image"
                            type="file"
                            className={classes.textField}
                            onChange={this.fileChangeHandler}
                            margin="dense"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox checked={this.state.checked} onChange={this.handleChange} value={this.state.checked} required/>
                            }
                            label="I agree"
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
    institutions: state.institutions.institutions,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    addInstitution: (institutionData) => dispatch(addInstitution(institutionData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddInstitution));