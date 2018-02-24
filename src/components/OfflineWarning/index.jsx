import React, { Component } from 'react';
import { oneOfType, array, string, bool } from 'prop-types';
import './style.scss';

class OfflineWarning extends Component {
  state = {
    expanded: true,
  }

  toggleExpand = prevState => this.setState({ expanded: !prevState.expanded })

  render() {
    return (
      <button
        className="OfflineWarning"
        onClick={this.toggleExpand}
      >
        You're offline
      </button>
    )
  }
}

OfflineWarning.propTypes = {
  children: oneOfType([array, string]),
  empty: bool,
  preventLoading: bool,
};

export default OfflineWarning;
