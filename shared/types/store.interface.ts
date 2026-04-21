import { StorePermission } from './role.interface';

export interface IStore {
  id: string;
  name: string;
  subdomain?: string | null;
  description?: string | null;
  address?: string | null;
  phone: string;
  secondaryPhone?: string | null;
  email: string;
  logoUrl?: string | null;
  /** Link de incorporação do Google Maps (para iframe) */
  mapEmbedUrl?: string | null;
  /** URL da imagem da fachada da loja */
  storefrontImageUrl?: string | null;
  primaryColor?: string | null;
  instagramHandle?: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  permissions?: StorePermission[];
}
