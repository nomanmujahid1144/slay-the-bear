// src/types/api/api-response.types.ts

// Standard wrapper returned by ApiResponseUtil.success()
// Shape: { success: boolean, message: string, data?: T }
export interface ApiResponse<T = undefined> {
    success: boolean;
    message: string;
    data?: T;
}