import pickle
import warnings
import numpy as np
from helpers.feature import FeatureExtraction

warnings.filterwarnings('ignore')
with open("./models/url_validator_model.pkl", "rb") as file:
    gbc = pickle.load(file)


def analyzeUrl(url):
    obj = FeatureExtraction(url)

    x = np.array(obj.getFeaturesList()).reshape(1, 30)

    y_pro_phishing, y_pro_non_phishing = gbc.predict_proba(x)[0]

    report = obj.extractedFeatureSummary()
    return y_pro_non_phishing, report
