import jwt from "jsonwebtoken";
export const parseJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (e) {
    throw new Error("Invalid token");
  }
};

export const createJWT = (payload: any) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "2h",
  });
};
