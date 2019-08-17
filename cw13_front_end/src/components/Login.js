import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {loginUser} from "../store/actions/usersActions";
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

function Login(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const submitFormHandler = e => {
        e.preventDefault();
        props.loginUser(values);
    };

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Typography variant="h4" color="inherit" className={classes.typography_h4}>
                    Login
                </Typography>
                <form className={classes.container} autoComplete="on" onSubmit={submitFormHandler}>
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
                        id="password"
                        name="password"
                        label="Password"
                        defaultValue=""
                        className={classes.textField}
                        onChange={handleChange}
                        margin="dense"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{marginTop: "20px", float: "right"}}
                    >
                        Login
                    </Button>

                </form>
            </CardContent>
        </Card>
    );
}

const mapStateToProps = state => ({
    error: state.users.loginError,
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
