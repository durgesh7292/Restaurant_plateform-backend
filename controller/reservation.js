import { json } from "express";
import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
export const sendReservation = async (req, res, next) => {
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
export const sendReservation = async (req, res, next) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { firstName, LastName, email, phone, time, date } = req.body;
  //console.log("email: ", email);

  if ([firstName, LastName, email, phone, time, date].some((field) => field?.trim() === "")) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  const existedUser = await Reservation.findOne({ email });

  if (existedUser) {
    return next(new ErrorHandler(400, "User with email or username already exists"));
  }
  //console.log(req.files);

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
