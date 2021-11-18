import mongoose from "mongoose";

const personSchema = mongoose.Schema(
  {
    picture: { type: String },
    birthday: { type: Date, required: true },
    name: { type: String, required: true },
    address: { type: String },
    phone_number: { type: String, required: true },
  },
  {
    //   creating the fields automatically in db
    timestamps: true,
  }
);
const Person = mongoose.model("Person", personSchema);
export default Person;
