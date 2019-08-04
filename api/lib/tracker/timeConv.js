const units = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
};

function convertToNotifyInterval(length, unit) {
  return length * units[unit];
}

module.exports = {
  convertToNotifyInterval,
}