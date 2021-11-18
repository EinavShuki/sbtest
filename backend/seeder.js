import mongoose from "mongoose";
import dotenv from "dotenv";
import Person from "./models/personModel.js";
import people from "./data/contacts.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Person.deleteMany();
    // await Person.insertMany(people);
    // await Person.updateMany({}, [
    //   { $set: { birthday: { $toDate: "$birthday" } } },
    // ]);

    await Person.aggregate([
      {
        $project: {
          name: 1,
          birthday: {
            $dateToString: { format: "%Y-%m-%d", date: "$birthday" },
          },
        },
      },
    ]);

    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Person.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
//if I write in terminal node backend/seeder –d it calls to destroyData else importData ("shorten in package.json")
if (process.argv[2] === "-d") destroyData();
else importData();
