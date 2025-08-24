export interface ZodError {
    data?: {
        err?: {
            issues?: { path: string[]; message: string }[];
        };
        message?: string;
    };
}
