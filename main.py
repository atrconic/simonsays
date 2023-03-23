from flask import Flask, render_template, jsonify
app = Flask(__name__)


@app.route("/")
def render_index():
    return render_template("view.html")


@app.route("/action", methods=['POST'])
def do_action():
    d = {
        "a": "b",
    }
    return jsonify(d)







