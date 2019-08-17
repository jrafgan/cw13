import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {getInstitutions} from "../store/actions/institutionsActions";
import ReadOnlyRating from "../components/ReadOnlyRating";
import {getRatings} from "../store/actions/ratingsActions";
import CardMedia from "@material-ui/core/CardMedia";
import {apiURL} from "../constants";
import {Link} from "react-router-dom";

const styles = () => ({
    cardGrid: {
        paddingTop: 64,
        paddingBottom: 64,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    link: {
        margin: 8,
    },
    title: {
        height: 100
    },
    media: {
        height: 270,
    }
});

class Main extends Component {

    componentDidMount() {
        this.props.getInstitutions();
        this.props.getRatings();
    }

    componentDidUpdate(prevProps) {
        return prevProps.recipes !== this.props.recipes;
    }

    render() {
        const {classes, institutions, ratings} = this.props;
        console.log(institutions, ratings);
        return (
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {institutions && institutions.map(institution => (
                        <Grid item key={institution._id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={apiURL + '/uploads/' + institution.image}
                                    title="institution"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                        <Link to={`/institution/${institution._id}`} className={classes.link}>
                                        {institution.title}
                                        </Link>
                                    </Typography>
                                </CardContent>
                                {ratings && <ReadOnlyRating data={ratings.filter(rating=>rating.institution._id === institution._id)}/>}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    institutions: state.institutions.institutions,
    ratings: state.ratings.ratings,
});

const mapDispatchToProps = dispatch => ({
    getInstitutions: () => dispatch(getInstitutions()),
    getRatings: () => dispatch(getRatings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
