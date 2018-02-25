import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition, Transition } from "react-transition-group";
import List from './List';
import EmptyPage from './EmptyPage';
import TabBar from './TabBar';
import ItemShow from './ItemShow';
import OfflineWarning from './OfflineWarning';
import withAnimatedWrapper from './AnimatedWrapper';

class App extends Component {
  state = {
    wines: [],
    online: true,
  };

  componentDidMount() {
    this.getData();
    window.addEventListener('online', () => this.setOnlineStatus(true))
    window.addEventListener('offline', () => this.setOnlineStatus(false))
    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    window.removeEventListener('online')
    window.removeEventListener('offline')
  }

  setOnlineStatus = isOnline => this.setState({ online: isOnline })

  getData = () => {
    fetch('https://api-wine.herokuapp.com/api/v2/wines')
      .then(res => res.json())
      .then(data => {
        this.setState({ wines: data });
      })

  };

  renderContent(location) {
    if (!this.state.wines.length) {
      return <div />;
    }

    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Switch location={location}>
              <Route exact path="/" component={withAnimatedWrapper(List, { items: this.state.wines})} />
              <Route path="/wine/:id" component={withAnimatedWrapper(ItemShow, { items: this.state.wines})} />
              <Route path="/wishlist" component={EmptyPage} />
              <Route path="/cellar" component={EmptyPage} />
              <Route path="/articles" component={EmptyPage} />
              <Route path="/profile" component={EmptyPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        {!this.state.online && <OfflineWarning />}
        <TabBar />
      </Fragment>
    );
  }

  render() {
    return (
      <Router>
        <Route render={({ location }) => this.renderContent(location)} />
      </Router>
    );
  }
}

export default App;
