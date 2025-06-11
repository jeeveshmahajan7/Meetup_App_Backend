const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  posterImage: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  additionalInformation: [
    {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  eventTags: [
    {
      type: String,
      required: true,
    },
  ],
  eventStartDateAndTime: {
    type: Date,
    required: true,
  },
  eventEndDateAndTime: {
    type: Date,
    required: true,
  },
  eventAddress: {
    type: String,
    required: true,
  },
  eventCost: {
    type: Number,
    required: true,
  },
  speakers: [
    {
      speakerName: {
        type: String,
        required: true,
      },
      speakerDesignation: {
        type: String,
        requried: true,
      },
      speakerProfileImage: {
        type: String,
        required: true,
      },
    },
  ],
});

const Event = mongoose.model("Event", eventsSchema);

module.exports = Event;
