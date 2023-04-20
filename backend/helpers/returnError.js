export const returnError = (response, statusCode, errorMessage) => {
  return {
    response: response,
    statusCode: statusCode,
    msg: new Error(errorMessage).message,
  };
};
