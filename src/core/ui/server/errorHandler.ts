import { Response } from 'express';
import { UserAlreadyExistsError } from '../../application/user/userAlreadyExists.error';
import { BaseError } from '../../domain/error/baseError';

export class ErrorResponse {
  code: string;
  message: string;

  static fromBaseError(error: BaseError): ErrorResponse {
    return {
      code: error.code,
      message: error.message,
    };
  }

  static internalServerError(error: Error): ErrorResponse {
    return {
      code: 'internal-server-error',
      message: error.message,
    };
  }
}

export const catchError = (error: Error, response: Response) => {
  if (!(error instanceof BaseError)) {
    response.status(500).json(ErrorResponse.internalServerError(error));
    return;
  }

  if (error instanceof UserAlreadyExistsError) {
    response.status(409).json(ErrorResponse.fromBaseError(error));
    return;
  }
};
