import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    console.log(error);
    return null;
  }
};
