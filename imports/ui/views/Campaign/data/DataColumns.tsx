export const DataColumns = () => {
  return [
    {
      name: "Campaign Name",
      selector: (row: { campaign: any }) => row.campaign.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: { campaign: any }) => row.campaign.description,
      sortable: true,
    },
    {
      name: "Target",
      selector: (row: { campaign: any }) => row.campaign.target,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row: { actions: any }) => row.actions,
    },
  ];
};
