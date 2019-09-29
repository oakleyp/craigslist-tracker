units = {
  'days': 1000 * 60 * 60 * 24,
  'hours': 1000 * 60 * 60,
  'minutes': 1000 * 60,
}

def convert_to_notify_interval(length, unit):
  return int(length) * units[unit]