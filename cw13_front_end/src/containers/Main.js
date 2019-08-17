import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {deleteInstitution, getInstitutions} from "../store/actions/institutionsActions";
import ReadOnlyRating from "../components/ReadOnlyRating";
import {getRatings} from "../store/actions/ratingsActions";
import CardMedia from "@material-ui/core/CardMedia";
import {apiURL} from "../constants";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

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
        marginRight: 15,
        textDecoration: "none"
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
        return prevProps.ratings !== this.props.ratings;
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
                                {this.props.user && this.props.user.role === "admin" &&
                                <Button onClick={() => this.props.deleteInstitution(institution._id)}>Delete</Button>}
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
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    getInstitutions: () => dispatch(getInstitutions()),
    getRatings: () => dispatch(getRatings()),
    deleteInstitution: id => dispatch(deleteInstitution(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
