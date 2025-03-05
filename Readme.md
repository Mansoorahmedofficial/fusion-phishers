# Fusion Phisher (Educational Use Only)

**Important:** This tool is for educational purposes only and must be used in controlled, legal environments with explicit consent (personal labs). Unauthorized use against real users or systems is **illegal and unethical**.

## Features

- **Web-Based GUI:** An attacker interface to select and generate phishing links for fake login pages.
- **Fake Login Pages:** Templates mimicking Google and Facebook login pages.
- **Credential Harvesting:** Captures usernames and passwords entered by "victims."
- **Location Phishing:** Uses the Geolocation API to capture latitude and longitude.
- **Camera Access:** Requests webcam access and saves a snapshot.
- **Microphone Access:** Records a short audio clip using the microphone.
- **Data Storage:** Saves credentials, location, snapshots, and audio to local files for demonstration.

## Prerequisites

- **Python 3.x:** Required for the Flask backend.
- **Web Browser:** Modern browsers ( Chrome, Firefox, Brave) for testing the GUI and victim pages.
- **Dependencies:** Install via pip (see Installation).

## Installation

### Windows:
Download this repository or clone it:

```bash
git clone https://github.com/Mansoorahmedofficial/fusion-phishers.git
cd fusion-phishers
pip install -r requirement.txt
python main.py
```
### Linux:
```bash
git clone git clone https://github.com/Mansoorahmedofficial/fusion-phishers.git
cd fusion-phishers
virtualenv .venv # I hope you have installed Python virtualenv.
source ./venv/bin/activate
pip install -r requirement.txt
python main.py
```
### Output:
- **Credentials:** Stored in credentials.txt with timestamps and location data.
- **Snapshots:** Saved as PNG files in static/snapshots/.
- **Audio:** Saved as WebM files in static/audio/.


