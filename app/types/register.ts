export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
  details?: ValidationError[];
}

export interface RegisterSuccessResponse {
  success: true;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}
