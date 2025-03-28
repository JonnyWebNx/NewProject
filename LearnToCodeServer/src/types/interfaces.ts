// src/types/ApiResponse.ts
export interface BaseResponse {
    success: boolean;
    message: string;
    error?: string | object;
  }
  
  export interface ApiResponse<T = undefined> extends BaseResponse {
    data?: T;
  }

  export interface TokenPayload {
    id: string;
    email: string;
    // add any other fields you expect in the payload
  }
  
  