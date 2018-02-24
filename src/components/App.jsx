import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import List from './List';
import EmptyPage from './EmptyPage';
import TabBar from './TabBar';
import ItemShow from './ItemShow';
import OfflineWarning from './OfflineWarning';

class App extends Component {
  state = {
    wines: [],
    online: true,
  };

  componentDidMount() {
    this.getData();
    window.addEventListener('online', () => this.setOnlineStatus(true))
    window.addEventListener('offline', () => this.setOnlineStatus(false))
  }

  componentWillUnmount() {
    window.removeEventListener('online')
    window.removeEventListener('offline')
  }

  setOnlineStatus = isOnline => this.setState({ online: isOnline })

  getData = () => {
    fetch('https://api-wine.herokuapp.com/api/v1/wines')
      .then(res => res.json())
      .then(data => {
        this.setState({ wines: data });
      })

  };

  renderContent() {
    if (!this.state.wines.length) {
      return <div />;
    }

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={() => <List items={this.state.wines} />} />
          <Route path="/wine/:id" component={() => <ItemShow items={this.state.wines} />} />
          <Route path="/wishlist" component={EmptyPage} />
          <Route path="/cellar" component={EmptyPage} />
          <Route path="/articles" component={EmptyPage} />
          <Route path="/profile" component={EmptyPage} />
        </Switch>
        {!this.state.online && <OfflineWarning />}
        <TabBar />
      </Fragment>
    );
  }

  render() {
    return (
      <Router>
        <Fragment>
          {this.renderContent()}
        </Fragment>
      </Router>
    );
  }
}

export default App;
