import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "./store/actions/usersActions";
import Routes from "./Routes";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <Fragment>
          <Header user={this.props.user} logout={this.props.logoutUser}/>
        <div className="App">
            <Routes user={this.props.user} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));