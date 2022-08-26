declare interface User {
  uid: string;
  email: string;
  name: string;
  image?: string;
  is_admin: boolean;
  has_verified_email: boolean;
}
