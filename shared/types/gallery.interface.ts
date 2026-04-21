export interface IGallery {
  id: string;
  storeId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGalleryBatchDto {
  urls: string[];
}
