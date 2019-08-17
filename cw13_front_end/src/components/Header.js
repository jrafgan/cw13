import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import {Link} from "react-router-dom";
import {apiURL} from "../constants";
import CardMedia from "@material-ui/core/CardMedia";


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
        marginLeft: 15,
        textDecoration: "none"
    },
    media: {
        height: 50,
        width: 50
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

                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">
                            Institutions
                        </Link>
                    </Typography>

                    {user ? <Fragment>
                        <Typography>{`Hello, ${user.name} ! `}</Typography>
                        <CardMedia
                            className={classes.media}
                            image={apiURL + '/uploads/' + user.image}
                            title="institution"
                        />
                        <Link className={classes.link} to="/" onClick={logout}>Logout</Link>
                        <Link className={classes.link} to="/add_institution">Add institution</Link>
                    </Fragment> : <Fragment>
                        <Link className={classes.link} to="/login">Login</Link>
                        <Link className={classes.link} to="/register">Register</Link>
                    </Fragment>}
                </Toolbar>
            </AppBar>
        </div>
    );
}
