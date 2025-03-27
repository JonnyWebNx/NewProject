export interface ApiError {
  status: string;
  message: string;
  statusCode: number;
}

export class ApiErrorHandler {
  static handle(error: any): ApiError {
    if (error.response?.data) {
      // Server responded with error
      return {
        status: error.response.data.status || 'error',
        message: error.response.data.message || 'An unexpected error occurred',
        statusCode: error.response.status
      };
    } else if (error.request) {
      // Request was made but no response
      return {
        status: 'error',
        message: 'No response from server',
        statusCode: 0
      };
    } else {
      // Something else went wrong
      return {
        status: 'error',
        message: error.message || 'An unexpected error occurred',
        statusCode: 0
      };
    }
  }
} 