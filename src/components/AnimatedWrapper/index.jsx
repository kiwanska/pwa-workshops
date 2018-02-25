import React, { Component } from 'react';

const withAnimatedWrapper = (WrappedComponent, componentProps = {}) => {
  return class extends Component {
    render() {
      return (
        <div className="AnimatedWrapper">
          <WrappedComponent {...this.props} {...componentProps} />
        </div>
      );
    }
  };
};

export default withAnimatedWrapper;
