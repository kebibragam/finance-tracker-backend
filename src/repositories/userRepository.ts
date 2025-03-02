import User, { IUser } from "../models/User";

const findByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email }).exec();
};

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  return await User.create(userData);
};

export default { findByEmail, createUser };
