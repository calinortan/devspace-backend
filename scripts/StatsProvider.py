from bson.objectid import ObjectId
from collections import defaultdict

class StatsProvider:
    """Class used to compute stats on user connections"""

    def __init__(self, db_conn, user_id):
        """
        @type db_conn: pymongo.database.Database
        @type user_id: str
        """
        self.age_dict = defaultdict(float)
        self.comp_os_dict = defaultdict(float)
        self.mobile_os_dict = defaultdict(float)
        self.workplace_os_dict = defaultdict(float)
        self.interests_dict = defaultdict(float)
        self.db = db_conn
        self.user_id = user_id
        self.get_connections()

    def get_connections(self):
        user_model = self.db['users']
        user = user_model.find_one({"_id": ObjectId(self.user_id)})
        friends_cursor = user_model.find({"_id": {"$in": user['connections']}})
        users_list = []
        for u in friends_cursor:
            users_list.append(u)
            self.add_user_connection_stats(u)
        self.normalize_dictionaries(friends_cursor.count())
        return users_list

    def normalize_dictionaries(self, connections_size):
        list = [self.age_dict, self.comp_os_dict, self.mobile_os_dict,
                self.interests_dict, self.workplace_os_dict]
        for d in list:
            for key, val in d.items():
                d[key] = float(format(val / connections_size, '.4f'))

    def add_user_connection_stats(self, connection):
        self.age_dict[str(connection['age'])] += 1
        self.comp_os_dict[connection['computerOS']] += 1
        self.mobile_os_dict[connection['mobileOS']] += 1
        self.compute_workplace_norm(connection['workplace'])
        self.compute_interests(connection['interests'])

    def compute_workplace_norm(self, workplace):
        workplace = workplace.lower().replace(' ', '')
        self.workplace_os_dict[workplace] += 1

    def compute_interests(self, list):
        for i, val in enumerate(list):
            interest = val.lower().replace(' ', '')
            self.interests_dict[interest] += 1

    def get_new_stats(self):
        data = {}
        data['age'] = dict(self.age_dict)
        data['computerOS'] = dict(self.comp_os_dict)
        data['mobileOS'] = dict(self.mobile_os_dict)
        data['workplace'] = dict(self.workplace_os_dict)
        data['interests'] = dict(self.interests_dict)
        return data

    def save_or_update_new_stats(self):
        data = self.get_new_stats()
        self.db['stats'].find_one_and_update(
                                            {'user': ObjectId(self.user_id)},
                                            {'$set': {'data': data}},
                                            upsert=True
                                            )