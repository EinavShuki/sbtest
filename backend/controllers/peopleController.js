import Person from "../models/personModel.js";
import { formatPhone } from "../utils/utils.js";

const getPeople = async (req, res, next) => {
  try {
    const { text = "", page = 0 } = req.query;
    const regQuery = `.*${text}.*`;
    // console.log(query, regQuery);

    const year = new Date().getFullYear() - Number(text);
    const firstOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);

    const query = {
      $or: [
        { name: new RegExp(regQuery) },
        { address: new RegExp(regQuery) },
        { phone_number: new RegExp(regQuery) },
        {
          birthday: {
            $gte: new Date(firstOfYear),
            $lt: new Date(endOfYear),
          },
        },
      ],
    };

    console.log(query);

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
