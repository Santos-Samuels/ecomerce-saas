import { IRole } from '@ecomerce/shared';

export class Role implements IRole {
  id: string;

  name: string;

  permissions: string[];

  active: boolean;
}
