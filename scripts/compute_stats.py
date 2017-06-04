import sys
import pymongo
from config import mongodb_url
from StatsProvider import StatsProvider

def get_mongo_connection(url, dbName):
    return pymongo.MongoClient(url)[dbName]

user_id = sys.argv[1]
# user_id = '58d7a61f11af570bc83e9d34'

db_conn = get_mongo_connection(mongodb_url, 'calinortandb')
statsProvider = StatsProvider(db_conn, user_id)
statsProvider.save_or_update_new_stats()

