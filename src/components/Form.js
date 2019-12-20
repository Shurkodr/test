import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters,
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changeFilter(action) {
    const actionTarget = action.target.value;

    this.setState((prevState) => {
      const { filters } = prevState;
      const idOfFilterToChange = filters.findIndex(filter => (
        filter.name === actionTarget
      ));

      filters[idOfFilterToChange].isChecked
        = !filters[idOfFilterToChange].isChecked;

      return ({
        ...prevState, filters,
      });
    });
  }

  submitForm(action) {
    action.preventDefault();
    const { applyFilters } = this.props;

    applyFilters(this.state.filters);
  }

  render() {
    return (
      <form className="filters-block" onSubmit={this.submitForm}>
        {
          this.state.filters.map(filter => (
            <label
              className="filters-block__label"
              htmlFor={filter.name}
              key={filter.name}
            >
              <input
                className="filters-block__checkbox"
                type="checkbox"
                value={filter.name}
                checked={filter.isChecked}
                key={filter.id}
                onChange={this.changeFilter}
                id={filter.name}
              />
              <span
                key={filter.id + filter.name}
                className={`image${(filter.isChecked ? ' image_active' : '')}`}
              />
              {filter.name}
            </label>
          ))
        }
        <button
          className="filters-block__button"
          type="submit"
          onClick={this.submitForm}
        >
          Apply
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Form;
