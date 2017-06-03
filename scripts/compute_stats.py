import sys
import pymongo
from config import mongodb_url
from StatsProvider import StatsProvider

def get_mongo_connection(url, dbName):
    return pymongo.MongoClient(url)[dbName]

user_id = sys.argv[1]
db_conn = get_mongo_connection(mongodb_url, 'calinortandb')
statsProvider = StatsProvider(db_conn, user_id)
statsProvider.save_or_update_new_stats()

