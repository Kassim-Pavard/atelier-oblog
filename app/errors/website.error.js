export default class ApiError extends Error {
  constructor(message, info) {
    super(message);
    this.name = 'WebsiteError';
    this.format = 'html';
    this.httpStatus = info.httpStatus || 500;
  }
}
