from flask import Blueprint, render_template, request

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    # Read query params from URL: { speed, playback }
    speed = request.args.get('speed', default=1, type=float)
    playback = request.args.get('playback', default='stop', type=str)
    return render_template('pages/index.html', title="Home", speed=speed, playback=playback)
