class ApiError extends Error {
  constructor(statusCode, message, error,statck = "",) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.success = false
    this.message = message
    this.error = error;
    this.data = null

    if(statck){
      this.statck = statck
    }else{
      Error.captureStackTrace(this, this.constructor)
    }
  }
  
}

export default ApiError;
