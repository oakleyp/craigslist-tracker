const units = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  second: 1000,
};

function convertToNotifyInterval(length, unit) {
  console.log({length, unit});
  return length * units[unit];
}

module.exports = {
  convertToNotifyInterval,
}