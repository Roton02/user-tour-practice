import { Request, Response } from 'express'
import { tourService } from './tour.service'
import { sendResponse } from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createTour = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await tourService.createTour(body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Tour created successfully',
    data: result,
  })
})

const getTours = async (req: Request, res: Response) => {
  try {
    const result = await tourService.getTours()

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tours get successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.getSingleTour(id)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tours get successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const updateTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body
    const result = await tourService.updateTour(id, body)

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Tours update successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.deleteTour(id)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tours delete successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.getNextSchedule(id)

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Tours get successfully',
      data: result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const tourController = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
