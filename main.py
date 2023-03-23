import random

from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

colors = ["blue", "red", "green", "yellow"]
guess = []
actions = []

@app.route("/")
def render_index():
    reset()
    return render_template("view.html")


@app.route("/action", methods=['POST'])
def do_action():
    global actions, guess
    data = request.json
    color_var = data.get("color")
    actions.append(color_var)
    res = jsonify({
        'actions': actions,
        'guess': guess,
    })
    guess.append(rand_color())
    return res


def reset():
    global actions, guess
    guess = [rand_color()]
    actions = []


def rand_color():
    return colors[random.randint(0, len(colors) - 1)]






