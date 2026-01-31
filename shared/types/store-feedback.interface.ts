export interface IStoreFeedback {
  id: string;
  storeId: string;
  customerName: string;
  comment: string;
  stars: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
