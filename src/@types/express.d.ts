import { IUser } from "types/interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
