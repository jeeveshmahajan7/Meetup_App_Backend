const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.model");
initializeDatabase();

const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const getMeetupEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    console.log("Error fetching meetup events:", error);
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await getMeetupEvents();
    if (events.length > 0) {
      res
        .status(200)
        .json({ message: "Events fetched successfully:", events: events });
    } else {
      res.status(404).json({ error: "Events not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

const createNewEvent = async (newEvent) => {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    console.log("Error creating new event:", error);
  }
};

app.post("/events", async (req, res) => {
  try {
    const newEvent = await createNewEvent(req.body);
    if (newEvent) {
      res.status(201).json({ message: "Successfully created new event." });
    } else {
      res.status(400).json({ error: "Invalid event data." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create new Event." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
