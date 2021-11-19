import Person from "../models/personModel.js";
import { formatPhone } from "../utils/utils.js";

const getPeople = async (req, res) => {
  try {
    const { name = "", age = "", phone = "" } = req.query;
    const query = {
      name: { $regex: name },
    };

    if (phone) {
      query.phone_number = formatPhone(phone);
    }

    if (age) {
      const year = new Date().getFullYear() - Number(age);
      const firstOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31);

      query.birthday = {
        $gte: new Date(firstOfYear),
        $lt: new Date(endOfYear),
      };
    }

    const people = await Person.find(query).sort({
      name: 1,
    });

    res.json(people);
  } catch (err) {
    res.status(404);
    console.error("Somthing is wrong", err);
  }
};

export { getPeople };
