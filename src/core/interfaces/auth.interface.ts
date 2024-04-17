import { ApiResponse } from './http-response';

interface Role {
  id: number;
  name: string;
}

export interface Auth {
  capabilityRoles: Role[];
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  token: string;
  username: string;
}

export interface LoginResponse extends ApiResponse {
  data: Auth;
}

export interface LoginRequest {
  username: string;
  password: string;
}
