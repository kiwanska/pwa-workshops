import React, { PureComponent } from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import ListRating from '../ListRating';
import Image from '../Image';
import BottleSvg from '../../svg-components/Bottle';
import './style.scss';

class ListItem extends PureComponent {
  render() {
    return (
      <li>
        <div className="ListItem">
          <article>
            <section className="ListItem__main">
              <div className="ListItem__photo-container">
                {this.props.image_url ? (
                  <Image
                    className="ListItem__photo"
                    src={this.props.image_url}
                    alt={this.props.name}
                  />
                ) : (
                  <BottleSvg className="ListItem__photo" />
                )}
              </div>

              <div className="ListItem__description">
                <h2 className="ListItem__annotation ListItem__annotation--small">{this.props.kind}</h2>

                <Link to={`/wine/${this.props.id}`}>
                  <h1 className="ListItem__title">{this.props.name}</h1>
                </Link>
                <p className="ListItem__annotation">
                  {this.props.country_code && (
                    <img
                      className="ListItem__icon"
                      src={`images/country-flags/${this.props.country_code}.svg`}
                      alt=""
                    />
                  )}
                  <span>{this.props.region}</span>
                </p>
              </div>
            </section>

            <footer className="ListItem__footer">
              <ListRating className="ListItem__footer-item" rating={this.props.rating} votesCount={this.props.nr_of_ratings} />

              <Link to={`/wine/${this.props.id}`} className="ListItem__footer-item ListItem__footer-action">
                buy (${this.props.price})
              </Link>
            </footer>
          </article>
        </div>
      </li>
    );
  }
}

ListItem.propTypes = {
  image_url: string,
  name: string,
  kind: string,
  id: number,
  country_code: string,
  region: string,
  rating: string,
  nr_of_ratings: number,
  price: number,
};

export default ListItem;
