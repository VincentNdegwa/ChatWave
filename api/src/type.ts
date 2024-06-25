export type createUserParams = {
  phone_number: string;
  password: string;
};
export type verifyOTP = {
  id: number;
  OTP: number;
};
export type updateUserParams = {
  old_password: string;
  new_password: string;
};
