export type Result = { success: boolean };
export type ResultError = { success: false, error: string };
export type ResultPass = { success: true }
export type CreateResult = (ResultPass & { id: string }) | ResultError;