/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Record<string, any>,
  next: NextFunction
) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'something is wrong ',
    error: err,
  })
}

export default globalErrorHandler
