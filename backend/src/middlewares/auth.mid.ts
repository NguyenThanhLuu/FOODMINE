import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.access_token as string;
    if (!token) return res.status(HTTP_UNAUTHORIZED).send();
    const decodedUser = verify(token, "helloPrivateKey");
    req.user = decodedUser;
  } catch (error) {
    res.status(HTTP_UNAUTHORIZED).send();
  }

  return next();
};
