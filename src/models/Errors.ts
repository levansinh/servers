export default class ErrorWithStatus {
  flat?: boolean;
  message: string;
  status: number;
  constructor({ message, status, flat }: { message: string; status: number; flat: boolean }) {
    this.flat = flat || false;
    this.message = message;
    this.status = status;
  }
}
