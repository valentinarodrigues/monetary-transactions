import { StatusCodes } from 'http-status-codes';

const responseHandler = (fn) => {
  return async (req, res, next) => {
    try {
      const data = await fn(req);
      res.status(StatusCodes.OK).json({
        status: 'ok',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
};

export default responseHandler;
