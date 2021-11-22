import Person from "../models/personModel.js";
import { formatPhone } from "../utils/utils.js";

const getPeople = async (req, res, next) => {
  try {
    const { name = "", age = "", phone = "", page = 1 } = req.query;
    const query = {
      name: { $regex: name, $options: "i" },
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

    const perPage = 20;

    const count = await Person.countDocuments(query);
    const people = await Person.find(query)
      .limit(perPage)
      .skip(perPage * page)
      .sort({
        name: 1,
      });

    res.json({ people, count, perPage });
  } catch (err) {
    res.status(404);
    return next(err);
  }
};

export { getPeople };
