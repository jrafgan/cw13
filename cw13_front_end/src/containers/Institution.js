import React, {Component, Fragment} from 'react';
import {getInstitution} from "../store/actions/institutionsActions";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import {addRating, getRatings} from "../store/actions/ratingsActions";
import Paper from '@material-ui/core/Paper';
import ImageThumbnail from "../components/ImageThumbnail";
import Divider from "@material-ui/core/Divider";
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import {apiURL} from "../constants";
import AverageRating from "./AverageRating";
import AddRating from "../components/AddRating";
import moment from "moment";
import UserRating from "../components/UserRating";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import AddImage from "./AddImage";
import {addImage, getImages} from "../store/actions/imageActions";

const styles = () => ({
    root: {
        padding: 12,
        marginTop: "2%",
        width: "90%"
    },
    media: {
        maxHeight: 270,
        float: "right",
    },
    description: {
        marginTop: 10,
        marginBottom: 10,
        minHeight: 225
    },
    gridRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    gridTitleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    textArea: {
        marginLeft: 20,
        marginTop: 10,
        width: "90%"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    }
});

class Institution extends Component {

    state = {
        institution: this.props.match.params.id,
        user: null,
        food_quality: 0,
        service_quality: 0,
        interior: 0,
        comment: ""
    };

    componentDidMount() {
        this.props.getInstitution(this.props.match.params.id);
        this.props.getRatings(this.props.match.params.id);
        this.props.getImages(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ratings !== this.props.ratings || prevProps.user !== this.props.user) {
            if(this.props.user) this.setState({user: this.props.user._id});
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    changeHandler = (e, newValue) => {
        switch (e.target.name) {
            case "easy_to_make":
                return this.setState({food_quality: newValue});
            case "quick_to_make":
                return this.setState({service_quality: newValue});
            case "taste":
                return this.setState({interior: newValue});

            default:
                return;
        }
    };

    fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    formSubmit = e => {
        e.preventDefault();
        this.props.addRating(this.state);
    };

    render() {
        const {classes, institution, ratings, images} = this.props;
        if (ratings) console.log(ratings);
        return (
            <Paper className={classes.root}>
                {institution && <Fragment>
                    <ImageThumbnail image={institution.image} class={classes.media}/>
                    <Typography variant="h4" component="h3">
                        {institution.title}
                    </Typography>
                    <Typography component="p" className={classes.description}>
                        {institution.description}
                    </Typography>
                    <Divider variant="middle"/>
                    <Typography variant="h4" component="h3">
                        Images
                    </Typography>

                    <div className={classes.gridRoot}>
                        {images && <GridList className={classes.gridList} cols={1}>
                            {images.map(image=><GridListTile key={image._id} >
                                <img src={apiURL + '/uploads/' + image.image} alt={image.image}/>
                                <GridListTileBar
                                    title=""
                                    classes={{root: classes.gridTitleBar}}
                                />
                            </GridListTile>)}
                        </GridList>}
                    </div>

                    <Divider variant="middle"/>

                    <Typography variant="h4" component="h3">
                        Average Ratings
                    </Typography>
                    {ratings && <Fragment>
                        <AverageRating rating={ratings}/>
                        <Divider variant="middle"/>

                        <Typography variant="h4" component="h3">
                            Comments
                        </Typography>

                        {ratings.map(rating => <Paper className={classes.root} key={rating._id}>
                            <Typography variant="h6" component="span">
                                {`On ${moment(rating.date).format('lll')}, ${rating.user.name} wrote: `}
                            </Typography>

                            <Typography component="p">
                                {rating.comment}
                            </Typography>

                            <UserRating rating={rating}/>
                        </Paper>)}
                    </Fragment>}

                    {this.props.user &&
                        <AddImage institutionId={institution._id} addImage={this.props.addImage}/>
                    }
                        {this.props.user && (
                        <Paper className={classes.root}>
                            <Typography variant="h4" component="h3">
                                Comment and rate
                            </Typography>

                            <form className={classes.container} onSubmit={this.formSubmit} autoComplete="on">
                                <TextareaAutosize
                                    className={classes.textArea}
                                    name="comment"
                                    aria-label="minimum height"
                                    rows={3}
                                    placeholder="Your comment here"
                                    value={this.state.comment}
                                    onChange={this.handleChange}/>

                                <AddRating
                                    changeHandler={this.changeHandler}
                                    easy_to_make={this.state.food_quality}
                                    quick_to_make={this.state.service_quality}
                                    taste={this.state.interior}/>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{marginTop: "45px", float: "right", height: "28px"}}>
                                    Add
                                </Button>
                            </form>
                        </Paper>
                    )}

                    <Divider variant="middle"/>
                </Fragment>}
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    institution: state.institutions.institution,
    ratings: state.ratings.ratings,
    images: state.images.images,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    getInstitution: id => dispatch(getInstitution(id)),
    getRatings: id => dispatch(getRatings(id)),
    addRating: ratingsData => dispatch(addRating(ratingsData)),
    addImage: (imageData) => dispatch(addImage(imageData)),
    getImages: (id) => dispatch(getImages(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Institution));