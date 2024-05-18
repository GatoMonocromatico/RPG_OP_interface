from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import pyrebase
from flask_login import current_user, UserMixin, login_user, LoginManager, login_required
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

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


class User(UserMixin):
    def __init__(self, dados, usuario_novo):
        self.email = dados["email"]
        self.senha = dados["senha"]


@login_manager.user_loader
def carrega_usuario(user_id):
    dados_usuario = bd.child(f"usuarios/{user_id}").get().val()
    if dados_usuario:
        return User(dados_usuario, False)
    else:
        return None


@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")


if __name__ == '__main__':
    app.run(debug=True)
