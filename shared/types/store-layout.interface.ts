export interface IStoreLayout {
  id: string;
  storeId: string;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroButtonText?: string | null;
  heroButtonLink?: string | null;
  heroBackgroundImage?: string | null;
  aboutTitle?: string | null;
  aboutDescription?: string | null;
  aboutImage?: string | null;
  showFeedbacks: boolean;
  createdAt: Date;
  updatedAt: Date;
}
