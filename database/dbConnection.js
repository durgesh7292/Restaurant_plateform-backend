import mongoose from "mongoose";
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESTRUENT",
    })
    .then(() => {
      console.log("Connected to database sucessfully");
    })
    .catch((err) => {
      console.log(`some error occuried whiole connecting to database ${err}`);
    });
};
