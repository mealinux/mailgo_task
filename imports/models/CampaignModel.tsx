export default interface CampaignModel {
  _id?: string;
  name: string;
  description: string;
  target: string;
  createdAt?: string;
  updatedAt?: string;
  category: {
    _id: string;
    name: string;
  };
}
