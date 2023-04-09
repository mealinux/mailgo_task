export const DataColumns = () => {
  return [
    {
      name: "Name",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: any) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
    },
    { name: "Actions", selector: (row: any) => row.actions },
  ];
};
