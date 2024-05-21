from config import app, csrf, bd, auth_firebase, login_manager
from flask import Flask, render_template, request, redirect, url_for, jsonify, session, Blueprint
import pyrebase
from flask_login import login_user, current_user, LoginManager, login_required
from flask_wtf.csrf import CSRFProtect
import os
from dotenv import load_dotenv
from models import carrega_usuario

login_manager.init_app(app)
login_manager.login_view = 'auth.login'
login_manager.user_loader(carrega_usuario)


from auth import auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')


@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
