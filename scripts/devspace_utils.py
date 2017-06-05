def get_normalized_string_key(raw_key):
    return str(raw_key).lower().replace(' ', '')

def get_age_range(age):
    if age < 22:
        return "under 22"
    elif age < 25:
        return "22 - 24"
    elif age < 30:
        return "25 - 29"
    elif age < 36:
        return "30 - 35"
    elif age < 46:
        return "36 - 45"
    else:
        return "over 45"