export interface ImageFromDb {
  _id: ObjectId;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  image: string;
}

export interface ImageMutation {
  title: string,
  image: File | null
}

export interface UserFromDb {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string
  image: string
}

export interface RegisterResponse {
  user: UserFromDb;
  message: string
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}