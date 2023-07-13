const Subscriber = require("../models/subscribers.model.js");

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json({ subscribers });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findOne({ email: req.query.EMAIL });
    if (subscriber) {
      return res
        .status(200)
        .send(`__jp0({ result: "error", msg: "You are already subscribed" })`);
    }

    await Subscribers.create({ email: req.query.EMAIL });
    res
      .status(200)
      .send(`__jp0({ result: "success", msg: "Thank you for joining us" })`);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getSubscribers,
  addSubscriber,
};
