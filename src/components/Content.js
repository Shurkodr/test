import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentItem from './ContentItem';
import { Loader } from 'semantic-ui-react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      isLoading: true,
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { filter } = this.props;
    const contentUrl
      = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(contentUrl);
    const contentFromServer = await response.json();

    this.setState({
      content: contentFromServer.drinks, isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="ui active centered inline loader" />
      );
    }

    const { filter } = this.props;
    const { content } = this.state;

    return (
      <div className="content-row">
        <h2 className="content-row__header">
          {filter}
        </h2>
        <div className="content-row__block">
          {
            content.map(item => <ContentItem key={item.idDrink} item={item} />)
          }
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default Content;
