from flask import Flask, render_template, request
import logging
print("Scratch Coins Webserver v1.1")
app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")
@app.route("/discord")
def discord():
  return render_template("discord.html")
@app.route("/add")
def add():
  return render_template("add.html")
@app.route("/login")
def login():
  return render_template("login.html")
@app.route("/register")
def register():
  limit = request.args.get("step")
  if limit is None:
    return render_template("register.html")
  return render_template("register-2.html")
@app.route("/dashboard")
def dashboard():
  return render_template("dashboard.html")
@app.route("/documentation")
def doc():
  return render_template("documentation.html")
@app.route("/projects")
def projects():
  return render_template("projects.html")
@app.route("/check")
def check():
  return "Ok",200
  
@app.route("/documentation/README.md")
def readme():
  return render_template("README.md")
  
@app.route("/documentation/_sidebar.md")
def sidebar():
  return render_template("_sidebar.md")
  
@app.route("/documentation/error.md")
def error():
  return render_template("error.md")
  
@app.route("/documentation/documentation.md")
def documentation():
  return render_template("documentation.md")

@app.route("/documentation/create.md")
def create():
  return render_template("create.md")

@app.errorhandler(404)
def not_found(e):
  return render_template("404.html")

app.run()