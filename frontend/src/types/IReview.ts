export default interface IReview {
  id: number;
  customerId: number;
  customerName: string;
  customerPicturePath: string;
  rating: number;
  comment: string;
  lastModified: string;
}
