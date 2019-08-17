import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {registerUser} from "../store/actions/usersActions";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
}));

function Register(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: "",
        name: "",
        password: "",
        image: null
    });

    const handleChange = event => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    const submitFormHandler = e => {
        e.preventDefault();
        if (values.image) {
            let formData = new FormData();
            Object.keys(values).forEach(key => {
                if (values[key] !== null) {
                    formData.append(key, values[key]);
                }
            });
            console.log(formData);
            props.registerUser(formData);
        } else {
            props.registerUser(values);
            console.log(values)
        }
    };

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Typography variant="h4" color="inherit" className={classes.typography_h4}>
                    Register
                </Typography>
                <form className={classes.container} autoComplete onSubmit={submitFormHandler}>
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        defaultValue=""
                        className={classes.textField}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        margin="dense"
                    />

                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        defaultValue=""
                        className={classes.textField}
                        onChange={handleChange}
                        margin="dense"
                    />

                    <TextField
                        id="image"
                        name="image"
                        type="file"
                        className={classes.textField}
                        onChange={fileChangeHandler}
                        margin="dense"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{marginTop: "20px", float: "right"}}
                    >
                        Register
                    </Button>

                </form>
            </CardContent>
        </Card>
    );
}

const mapStateToProps = state => ({
    error: state.users.registerError,
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);