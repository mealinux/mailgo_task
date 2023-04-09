export const DataColumns = () => {
  return [
    {
      name: "Name",
      selector: (row: { subscribe: any }) => row.subscribe.name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: { subscribe: any }) => row.subscribe.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { subscribe: any }) => row.subscribe.email,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row: { actions: any }) => row.actions,
    },
  ];
};
