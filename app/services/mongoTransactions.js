import mongoose from "mongoose";
import ConnectDB from "../db/connectDb";

export const runInTransaction = async (callback) => {
 const db = await ConnectDB();
  const session = await db.startSession();

  session.startTransaction();

  try {
    await callback(session);

    // Commit the changes
    await session.commitTransaction();
  } catch (error) {
    // Rollback any changes made in the database
    await session.abortTransaction();

    // logging the error
    console.error(error);

    // Rethrow the error
    throw error;
  } finally {
    // Ending the session
    await session.endSession();
  }
};
