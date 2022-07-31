declare namespace Express {
  declare namespace Multer {
    export interface File {
      key: string;
      location: string;
    }
  }

  export interface Request {
    user: {
      id: string;
    };
    file: Multer.File;
  }
}