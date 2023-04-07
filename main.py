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


@app.route("/get-guess")
def get_guess():
    global guess
    return jsonify(guess)


@app.route("/action", methods=['POST'])
def do_action():
    global actions, guess
    data = request.json
    color_var = data.get("color")
    is_end = False if color_var == guess[-1] else True
    actions.append(color_var)
    guess.append(rand_color())
    res = jsonify({
        'actions': actions,
        'guess': guess,
        'is_end': is_end,
    })
    if is_end:
        reset()
    return res


def reset():
    global actions, guess
    guess = [rand_color()]
    actions = []


def rand_color():
    return colors[random.randint(0, len(colors) - 1)]






