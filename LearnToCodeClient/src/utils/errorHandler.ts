export interface ApiError {
  status: string;
  message: string;
  statusCode: number;
  details?: any,
}

export class ApiErrorHandler {
  static handle(error: any): ApiError {
    if (error.response?.data) {
      // Server responded with error
      return {
        status: error.response.data.status || 'error',
        message: error.response.data.message || 'An unexpected error occurred',
        statusCode: error.response.status,
        details: error.response.data // Include entire response data for debugging

      };
    } else if (error.request) {
      // Request was made but no response
      return {
        status: 'error',
        message: 'No response from server',
        statusCode: 0,
        details: error.request // Include entire response data for debugging
      };
    } else {
      // Something else went wrong
      return {
        status: 'error',
        message: error.message || 'An unexpected error occurred',
        statusCode: 0,
        details: error
      };
    }
  }
} 