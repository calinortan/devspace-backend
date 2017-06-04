def get_normalized_string_key(raw_key):
    return str(raw_key).lower().replace(' ', '')

def get_age_range(age):
    if age < 24:
        return "under 24"
    elif age < 30:
        return "24 - 29"
    elif age < 40:
        return "30 - 39"
    elif age < 51:
        return "40 - 50"
    else:
        return "over 50"