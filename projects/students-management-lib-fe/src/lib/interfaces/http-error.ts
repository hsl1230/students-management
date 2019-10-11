export class HttpError {
  status: number;
  code: string;
  message: string;
  invalidParameter?: string;
  internalId: string;

  isInvalidRequest(): boolean {
    return this.status === 400;
  }
}
