import React, { Component } from 'react';
import { bool, object, string, element } from 'prop-types';
import arrowIcon from './../../assets/images/arrow.svg';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './style.scss';

class Nav extends Component {
  render() {
    const { title, annotation, history, back, children } = this.props;

    return (
      <header className="Nav">
        <div className="Nav__actions">
          {back && (
            <button aria-label="back" className="Nav__back" onClick={history.goBack}>
              <img src={arrowIcon} alt="back" />
            </button>
          )}
          <div>
            <Helmet
              title={title}
              meta={[
                { name: 'description', annotation },
                { property: 'fb:app_id', content: title },
                { property: 'og:url', content: window.location.href },
                { property: 'og:title', content: title },
                { property: 'og:type', content: 'article' },
                { property: 'og:description', content: annotation },
              ]}
            />
            {title && <h1 className="Nav__title">{title}</h1>}
            {annotation && <p className="Nav__annotation">{annotation}</p>}
          </div>
        </div>

        {children}
      </header>
    );
  }
}

Nav.propTypes = {
  back: bool,
  title: string,
  children: element,
  history: object,
};

export default withRouter(Nav);
