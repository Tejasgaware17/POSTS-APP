class CustomApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "API ERROR";
  }
}

module.exports = CustomApiError;
