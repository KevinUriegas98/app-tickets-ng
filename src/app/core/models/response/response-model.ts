export interface ApiResponse<T> {
    StatusCode: number;
    Success: boolean;
    Error: boolean;
    Message: string;
    Response: T;
    response: T;
}