export const DataColumns = () => {
  return [
    {
      name: "Category Name",
      selector: (row: { category: any }) => row.category.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: { category: any }) => row.category.description,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row: { actions: any }) => row.actions,
    },
  ];
};
