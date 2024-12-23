import catchAsync from '../../utils/catchAsync'
import { BookingService } from './booking.service'
import { sendResponse } from '../../utils/sendResponse'

const createBooking = catchAsync(async (req, res) => {
  const body = req.body
  const result = await BookingService.createBooking(body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'booking created successfully',
    data: result,
  })
})

export const bookingController = {
  createBooking,
}
