import {StatusCodes, getReasonPhrase} from 'http-status-codes'

const errorHandler = (err, req, res, next) => {  
  console.log(err)
  const status = 'fail';
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  res.status(statusCode).json({
    status,
    message,
  });
};

export default errorHandler;
