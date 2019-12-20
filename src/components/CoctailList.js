import React, { Component } from 'react';
import arrayFiltersFromList from '../functions/arrayFiltersFromList';
import Form from './Form';
import Content from './Content';
import { Loader } from 'semantic-ui-react';

class CoctailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: null,
      isLoading: true,
    };
    this.loadData = this.loadData.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  applyFilters(filters) {
    this.setState({ filters });
  }

  async loadData() {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );
    const filtersFromServer = await response.json();
    const filters = arrayFiltersFromList(filtersFromServer);

    this.setState({
      filters, isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading === false) {
      const { filters } = this.state;
      const filteredContent = filters.filter(item => item.isChecked === true);
      let ShowfilteredContent = filteredContent.map(item => (
        <Content key={item.id} filter={item.name} />
      ));

      if (ShowfilteredContent.length === 0) {
        ShowfilteredContent = <h2>No cocktails were found</h2>;
      }

      return (
        <div className="table-layout">
          <Form filters={filters} applyFilters={this.applyFilters} />
          <div className="content">
            {
              ShowfilteredContent
            }
          </div>
        </div>
      );
    }

    // return (<div>Loading</div>);
    return (
      <div className="ui active centered inline loader" />
    );
  }
}

export default CoctailList;
