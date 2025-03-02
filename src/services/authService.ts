import bcrypt from "bcryptjs";
import userRepository from "../repositories/userRepository";
import { generateToken } from "../utils/jwt";
import { IUser } from "../models/User";

const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser: IUser | null = await userRepository.findByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return await userRepository.createUser({
    name,
    email,
    passwordHash: hashedPassword,
  });
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user: IUser | null = await userRepository.findByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid email or password");

  if (!user._id) throw new Error("User ID is missing");

  return generateToken(user._id.toString());
};

export default { register, login };
