from flask import Flask
from app.routes import blueprints, inject_nav_links  # Import routes logic

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.config.Config')

    # ✅ Register all blueprints from `routes/__init__.py`
    for bp in blueprints:
        app.register_blueprint(bp)

    # ✅ Register the context processor
    app.context_processor(inject_nav_links)

    return app
