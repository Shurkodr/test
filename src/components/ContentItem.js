import React from 'react';
import PropTypes from 'prop-types';

function ContentItem(props) {
  const { item } = props;

  return (
    <div className="coctail-card">
      <img
        className="coctail-card__image"
        src={item.strDrinkThumb}
        alt={item.strDrink}
      />
      <p className="coctail-card__description">{item.strDrink}</p>
    </div>
  );
}

ContentItem.propTypes = {
  item: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default ContentItem;
