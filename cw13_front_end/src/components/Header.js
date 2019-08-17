import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: "#fff",
        marginRight: 15,
        textDecoration: "none"
    }
}));

export default function Header({user, logout}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <FastFoodIcon/>
                    </IconButton>
                    <Link className={classes.link} to="/">
                        <Typography variant="h6" className={classes.title}>
                            Institutions
                        </Typography>
                    </Link>
                    {user ? <Fragment>
                        <Link className={classes.link} to="/" onClick={logout}>Logout</Link>
                        <Link className={classes.link} to="/add_institution">AddInstitution</Link>
                    </Fragment> : <Fragment>
                        <Link className={classes.link} to="/login">Login</Link>
                        <Link className={classes.link} to="/register">Register</Link>
                    </Fragment>}
                </Toolbar>
            </AppBar>
        </div>
    );
}
