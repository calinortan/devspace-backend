# import sys
import pymongo
import numpy as np
from config import mongodb_url
from bson.objectid import ObjectId
from pprint import pprint
from sklearn.cluster import KMeans
from collections import defaultdict
from LinkRecommender import LinkRecommender

def get_mongo_connection(url, dbName):
    return pymongo.MongoClient(url)[dbName]


# user_id = sys.argv[1]
user_id = '58d7a61f11af570bc83e9d34'
db_conn = get_mongo_connection(mongodb_url, 'calinortandb')
rec = LinkRecommender(db_conn, user_id, PCA_components_no=4)
rec.apply_kmeans(4)
rec.print_clusters()
rec.plot_2d_clusters()
# rec.plot_3d_clusters()


