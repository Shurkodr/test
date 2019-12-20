function arrayFiltersFromList(filtersFromServer) {
  const filtersArr = filtersFromServer.drinks;

  return (
    filtersArr.map(
      (item, index) => ({
        name: item.strCategory, id: index, isChecked: true,
      })
    ));
}

export default arrayFiltersFromList;
