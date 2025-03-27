// src/types/ApiResponse.ts
export interface BaseResponse {
    success: boolean;
    message: string;
    error?: string | object;
  }
  
  export interface ApiResponse<T = undefined> extends BaseResponse {
    data?: T;
  }
  