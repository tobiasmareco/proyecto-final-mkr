export const returnError = (statusCode, errorMessage) => {
  return {
    response: "error",
    statusCode: statusCode,
    msg: new Error(errorMessage).message,
  };
};
