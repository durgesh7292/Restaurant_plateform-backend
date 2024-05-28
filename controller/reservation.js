import { json } from "express";
import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, LastName, email, phone, time, date } = req.body;
  //console.log("email: ", email);

  if ([firstName, LastName, email, phone, time, date].some((field) => field?.trim() === "")) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  const existedUser = await Reservation.findOne({ email });

  if (existedUser) {
    return next(new ErrorHandler(400, "User with email or username already exists"));
  }

  const user = await Reservation.create({
    firstName,
    LastName,
    email,
    phone,
    time,
    date,
  });

  const createdUser = await Reservation.findById(user.email);

  if (!createdUser) {
    return next(new ErrorHandler(400, "Something went wrong while registering the user"));
  }

  return res.status(201).json(new ErrorHandler(200, createdUser, "User registered Successfully"));
};
