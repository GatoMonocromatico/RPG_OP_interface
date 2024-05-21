from flask import Flask
import pyrebase
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('CHAVE_SECRETA_FLASK')

csrf = CSRFProtect(app)

firebase_config = {
    "apiKey": "AIzaSyC0CoViCDagIC6GpmY0mrkepx7X4n8dH4g",
    "authDomain": "op-database-728c3.firebaseapp.com",
    "databaseURL": "https://op-database-728c3-default-rtdb.firebaseio.com",
    "projectId": "op-database-728c3",
    "storageBucket": "op-database-728c3.appspot.com",
    "messagingSenderId": "354581472677",
    "appId": "1:354581472677:web:59ea75d8f1d0ba1a37344c",
    "serviceAccount": "serviceAccount.json"
}
# config para o firebase
firebase = pyrebase.initialize_app(firebase_config)
bd = firebase.database()

auth_firebase = firebase.auth()

login_manager = LoginManager()