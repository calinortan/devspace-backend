import devspace_utils
import numpy as np
import pymongo
import matplotlib.pyplot as plt
from bson.objectid import ObjectId
from collections import defaultdict
from config import mongodb_url
from pprint import pprint
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import silhouette_score as silhouette
from mpl_toolkits.mplot3d import Axes3D


class LinkRecommender:
    def __init__(self, db_conn, user_id, PCA_components_no=0):
        """
        @type db_conn: pymongo.database.Database
        @type user_id: str
        """
        self.db_conn = db_conn
        self.user_id = user_id
        self.connections = self.get_user_connections()
        self.stats = self.get_current_connections_stats()
        self.get_reccomendations()
        self.PCA_components_no = PCA_components_no

    def get_reccomendations(self):
        users = self.db_conn['users'].find()
        features_list = []
        users_list = []
        user_features = defaultdict(float)
        for u in users:
            users_list.append(u)
            user_features = self.create_features_set(u)
            arr = np.ndarray(len(user_features), float)
            for index, val in enumerate(user_features.values()):
                arr[index] = val
            features_list.append(arr)
        self.features_list = features_list
        self.users_list = users_list

    def create_features_set(self, user):
        user_features = defaultdict(float)
        self.add_age_feature(user_features, user)
        self.add_workplace_feature(user_features, user)
        self.add_mobile_os_feature(user_features, user)
        self.add_computer_os_feature(user_features, user)
        self.add_interests_feature(user_features, user)
        self.add_prog_lang_feature(user_features, user)

        return user_features

    def add_age_feature(self, user_features, user):
        self.add_feature(user_features, 'age',
                         devspace_utils.get_age_range(user['age']))

    def add_prog_lang_feature(self, user_features, user):
        key_name = 'programmingLanguages'
        user_features[key_name] = 0.0
        for interest in user[key_name]:
            self.add_feature(user_features, key_name,
                             interest, normalize_key=False)

    def add_computer_os_feature(self, user_features, user):
        self.add_feature(user_features, 'computerOS', user['computerOS'])

    def add_workplace_feature(self, user_features, user):
        self.add_feature(user_features, 'workplace',
                         user['workplace'], normalize_key=True)

    def add_interests_feature(self, user_features, user):
        user_features['interests'] = 0.0
        for interest in user['interests']:
            self.add_feature(user_features, 'interests',
                             interest, normalize_key=True)

    def add_mobile_os_feature(self, user_features, user):
        self.add_feature(user_features, 'mobileOS', user['mobileOS'])

    def add_feature(self, user_features, attr, attr_value, normalize_key=False):
        if normalize_key:
            attr_value = devspace_utils.get_normalized_string_key(attr_value)
        key = str(attr_value)
        if key in self.stats['data'][attr] or attr_value in self.stats['data'][attr]:
            user_features[attr] += self.stats['data'][attr][key]
        else:
            user_features[attr] += 0.0

    def apply_kmeans(self, n_clusters=2):
        np_features_array = np.array(self.features_list)
        X = MinMaxScaler(feature_range=(
            0, 1), copy=False).fit_transform(np_features_array)
        # pprint(X)
        if self.PCA_components_no > 0:
            pca = PCA(n_components=self.PCA_components_no)
            X = pca.fit_transform(X)
        self.np_features_array = X
        self.n_clusters = n_clusters
        self.kmeans = KMeans(n_clusters, random_state=0).fit(X)

    def get_kmeans_labels(self):
        return self.kmeans.labels_

    def get_user_connections(self):
        user = self.db_conn['users'].find_one({'_id': ObjectId(self.user_id)})
        return user['connections']

    def plot_2d_clusters(self):
        labels = self.get_kmeans_labels()
        pca = PCA(n_components=2)
        X = pca.fit_transform(self.np_features_array)
        # print(labels)
        plt.scatter(X[:, 0], X[:, 1], marker='^', c=labels)
        plt.show()

    def plot_3d_clusters(self):
        labels = self.get_kmeans_labels()
        pca = PCA(n_components=3)
        X = pca.fit_transform(self.np_features_array)
        fig = plt.figure()
        ax = fig.add_subplot(111, projection='3d')
        ax.scatter(X[:, 0], X[:, 1], X[:, 2], marker='^', c=labels)

        ax.set_xlabel('X Label')
        ax.set_ylabel('Y Label')
        ax.set_zlabel('Z Label')

        plt.show()

    def get_current_connections_stats(self):
        return self.db_conn['stats'].find_one({'user': ObjectId(self.user_id)})

    def print_clusters(self):
        labels = self.get_kmeans_labels()
        clusters = {}
        for i in range(self.n_clusters):
            clusters[str(i)] = {
                'f_n': 0, 'cluster_size': 0, 'f_n/total_f_n': 0, 'f_n/c_size': 0, 'overall_score': 0, 'contains_user': False}

        for user, label in zip(self.users_list, labels):
            clusters[str(label)]['cluster_size'] += 1
            if ObjectId(self.user_id) == user['_id']:
                clusters[str(label)]['contains_user'] = True
            if ObjectId(user['_id']) in self.connections:
                clusters[str(label)]['f_n'] += 1

        for i in range(self.n_clusters):
            clusters[str(i)]['f_n/total_f_n'] = float(
                format(clusters[str(i)]['f_n'] / len(self.connections), '.4f'))
            clusters[str(i)]['f_n/c_size'] = float(
                format(clusters[str(i)]['f_n'] / clusters[str(i)]['cluster_size']))
            clusters[str(i)]['overall_score'] = format(
                clusters[str(i)]['f_n/total_f_n'] + clusters[str(i)]['f_n/c_size'])
        pprint(clusters)
        s = silhouette(self.np_features_array, labels)
        print('\nSilhouette: %.3f' % s)

    # def print_recommendations(self):
    #     labels = self.get_kmeans_labels()

    #     for user, label in zip(self.users_list, labels):
