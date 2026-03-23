import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import { SigninInput, SignupInput } from "./auth.schema";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../config/db";

export const registerUser = async (userData:SignupInput) => {
  const { email, password } = userData;

  if (!email || !password) {
    throw AppError.badRequest("Email and password are required");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw AppError.conflict("User already exists");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    process.env.BCRYPT_SALT_ROUNDS
      ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
      : 10
  );
  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  const { password: _password, ...safeUser } = createdUser;

  return safeUser;
};
export const loginUser =async(loginData:SigninInput): Promise<string>=> {
  const { email, password } = loginData;
  if (!email || !password) {
    throw AppError.badRequest("Email and password are required");
  }

  const existingUser =await prisma.user.findUnique({
    where: { email },

  });

  if (!existingUser) {
    throw AppError.unauthorized("User not found");

  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordMatched) {
    throw AppError.unauthorized("Wrong password");
  }
  const accessToken = generateToken({
    id: existingUser.id,
  });
  return accessToken;
};