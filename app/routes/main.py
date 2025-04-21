from flask import Blueprint, render_template, request, url_for, redirect

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    # Read query params from URL: { speed, playback }
    speed = request.args.get('speed', default=3, type=int)
    playback = request.args.get('playback', default='stop', type=str)

    # Set playback to 'stop' every time the page is loaded
    if playback != 'stop':
        return redirect(url_for('main.index', speed=speed, playback='stop'))
    
    # Render the template with the parameters
    return render_template('pages/index.jinja2', title="Home", speed=speed, playback=playback)
