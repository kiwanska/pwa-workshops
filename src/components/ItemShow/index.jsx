import React from 'react';
import { Redirect } from 'react-router';
import { shape, number, array, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import StarsRating from '../StarsRating';
import BottleSvg from '../../svg-components/Bottle';
import ItemDetail from '../ItemDetail';
import Nav from '../Nav';
import './style.scss';

const ItemShow = ({ match, items, history }) => {
  const item = items[match.params.id - 1];

  if (!item) {
    return <Redirect to="/browse" />;
  }

  const annotation = `${item.color}, ${item.region}, ${item.country}`;

  return (
      <article className="ItemShow">
        <Helmet
          title={item.name}
          meta={[
            { name: 'description', annotation },
            { property: 'fb:app_id', content: item.name },
            { property: 'og:url', content: window.location.href },
            { property: 'og:title', content: item.name },
            { property: 'og:type', content: 'article' },
            { property: 'og:description', content: annotation },
            { property: 'og:image', content: item.image_url },
            { property: 'og:image:width', content: '694' },
            { property: 'og:image:height', content: '390' },
          ]}
        />
        <Nav back title={item.name} annotation={`${item.color}, ${item.region}, ${item.country}`} />

        <div className="ItemShow__inner">
          <img
            alt="country flag"
            className="ItemShow__country-outlines"
            src={`/images/country-outlines/${item.country_code}.svg`}
          />
          <div className="ItemShow__content">
            <div className="ItemShow__stats">
              <div className="ItemShow__rating">{item.rating}</div>
              <p>{item.nr_of_ratings} ratings</p>
              <StarsRating className="ItemShow__stars" maxRating={5} rating={item.rating} />
            </div>

            <div className="ItemShow__image-wrapper">
              {item.image_url ? (
                <img className="ItemShow__image" src={item.image_url} alt="wine" />
              ) : (
                <BottleSvg className="ItemShow__image" />
              )}
            </div>
          </div>
        </div>

        <ItemDetail item={item} />
      </article>
  );
};

ItemShow.propTypes = {
  match: shape({
    'params.id': number,
  }),
  history: object,
  items: array,
};

export default withRouter(ItemShow);
