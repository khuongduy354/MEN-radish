declare namespace Express {
  interface Request {
    username: string;
    userId: import("mongoose").Types.ObjectId.ObjectId;
  }
}
