export class Helpers {
  errorHandler(errorData: any, errorMessage: string | any, options = {}) {
    console.log(errorMessage);
    return {
      data: errorData,
      message: errorMessage,
      ...options
    }
  }

  responseHandler (resposeData: any, responseMessage: string = 'success', options = {}) {
    return {
      data: resposeData,
      message: responseMessage,
      ...options
    }
  }
}