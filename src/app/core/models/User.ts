export interface User {
  fullName: string;
  email: string;
}

export interface UserJWTPayload extends User {
  id: string;
}
