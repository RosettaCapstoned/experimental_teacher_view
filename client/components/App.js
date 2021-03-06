import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';
import Connection from './Connection';
import SignUp from './SignUp';
import { checkOAuthToken, exchangeTokenForAuth } from '../store/auth';

class App extends Component {
  componentDidMount() {
    const { checkOAuthToken, checkToken } = this.props;
    checkOAuthToken();
    checkToken()
  }

  render() {
    console.log(this.props.auth)
    const renderLogin = ({ history }) => <Login history={history} />;
    const { token } = this.props;
    console.log('Token rendered from App: ', token);
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/classroom" component={Connection} />
            <Route exact path="/login" render={renderLogin} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/auth/google" />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth,
    token: auth ? auth.auth : false,
  };
};
const mapDispatchToProps = dispatch => ({
  checkOAuthToken: () => dispatch(checkOAuthToken()),
  checkToken: () => dispatch(exchangeTokenForAuth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
