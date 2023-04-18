export const returnError = (response, statusCode, errorMessage) => {
  return { error: { 'response': response, 'statusCode': statusCode, msg: new Error(errorMessage).message } }
}