import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import { Link as RouterLink } from 'react-router-dom';

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
}));

export default function Header({user, logout}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <FastFoodIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Institutions
                    </Typography>
                    {user ? <Fragment>
                            <Button color="inherit" href="/" onClick={logout}>Logout</Button>
                            <Button color="inherit" href="/" >Home</Button>
                    </Fragment> :  <Fragment>
                        <Button color="inherit" href="/login" >Login</Button>
                        <Button color="inherit" href="/register" >Register</Button>
                    </Fragment>}
                </Toolbar>
            </AppBar>
        </div>
    );
}
