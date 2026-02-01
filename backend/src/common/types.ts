import { Request } from 'express';
import { AuthTokenPayload } from '../auth/auth.types';

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
  tenantId?: string;
}
