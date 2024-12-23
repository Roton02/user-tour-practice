import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import Booking from './booking.model'

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { tour, bookedSlots } = payload
    const requiredTour = await Tour.findById(tour)
    if (!requiredTour) {
      throw new Error('Tour not found')
    }
    const totalPrice = requiredTour.price * bookedSlots
    payload.totalPrice = totalPrice
    payload.bookingStatus = 'pending'
    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('Not enough seats available')
    }
    const booking = await Booking.create([payload], { session })

    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { availableSeats: -bookedSlots } },
      { new: true, session }
    )
    if (!updatedTour?.availableSeats) {
      throw new Error('Failed to update tour')
    }

    await session.commitTransaction()

    await session.endSession()

    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

/**
 *
 * Booking update -
 *
 * Booking cancel - Booking Model
 *
 * Tour AvailableSeats =   availableSeats + BookedSlot  - Tour Model
 *
 */

export const BookingService = {
  createBooking,
}