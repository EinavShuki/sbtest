import Person from "../models/personModel.js";

const getAllPeople = async (req, res) => {
  try {
    const allPeople = await Person.find({});
    res.json(allPeople);
  } catch (err) {
    res.status(404);
    console.error(err);
  }
};

const getPeopleByName = async (req, res) => {
  try {
    let { name } = req.body;
    const people = await Person.find({ name: { $regex: name } });
    res.json(people);
  } catch (err) {
    res.status(404);
    console.error(err);
  }
};

const getPeopleByPhone = async (req, res) => {
  try {
    let { phone } = req.body;
    const people = await Person.find({ phone_number: phone });
    res.json(people);
  } catch (err) {
    res.status(404);
    console.error(err);
  }
};
const getPeopleByAge = async () => {
  try {
  } catch (err) {}
};

export { getAllPeople, getPeopleByPhone, getPeopleByAge, getPeopleByName };
