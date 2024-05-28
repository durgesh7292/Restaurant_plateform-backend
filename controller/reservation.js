import { json } from "express";
import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
export const sendReservation = async (req, res, next) => {
  i;
  const { firstName, LastName, email, phone, time, date } = req.body;
  if (!firstName || !LastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("please full fill reservation from!", 400));
  }
  const existingReservation = await Reservation.findOne({ email });
  if (existingReservation) {
    return next(new ErrorHandler("A reservation already exists for the selected emai.", 400));
  }

  try {
    await Reservation.create({
      firstName,
      LastName,
      email,
      phone,
      time,
      date,
    });

    res.status(200).json({
      success: "true",
      message: "Reservation sent Sucessfully!",
    });
  } catch (error) {
    if (error.name === "validationError") {
      const validationErrors = object.value(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(","), 400));
    }
    return next(error);
  }
};
