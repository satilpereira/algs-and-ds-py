from flask import Blueprint, url_for

from .main import main_bp
# from .about import about_bp
# from .users import users_bp  # Example user routes

# ✅ Define a list of blueprints
blueprints = [main_bp]  # Add more blueprints when needed

# ✅ Define the context processor here
def inject_nav_links():
    return {
        "nav_links": [
            {"label": "Home", "href": url_for('main.index')},
            # {"label": "About", "href": url_for('about.about')},
            # {"label": "Profile", "href": url_for('users.profile')}
        ]
    }
