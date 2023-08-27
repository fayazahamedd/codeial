const kue = require("kue");

const queue = kue.createQueue();
// const queue = kue.createQueue("my-queue", "redis://redis:6379");

module.exports = queue; // queue is a group of similar jobs(emails , otps , notifications)
