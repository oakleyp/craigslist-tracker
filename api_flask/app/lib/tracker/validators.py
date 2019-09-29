from mongoengine.errors import ValidationError

def valid_notify_interval(interval):
    validation_err = ValidationError('notify_interval must be an integer greater than 0')

    try:
      if int(interval) <= 0:
        raise validation_err
    except:
      raise validation_err