export class ApiErrorDTO {

  errorCode: number;
  message: string;
  detailedMessage?: string;
  traceId?: string;


  constructor(errorCode: number, message: string, detailedMessage?: string, traceId?: string) {
    this.errorCode = errorCode;
    this.message = message;
    this.detailedMessage = detailedMessage;
    this.traceId = traceId;
  }

}
