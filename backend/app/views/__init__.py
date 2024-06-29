from flask import Blueprint
from ..controllers import auth_controller, paper_controller, user_controller

def register_views(app):
    api = Blueprint('api', __name__)
    
    api.route('/users', methods=['GET'])(user_controller.get_users)
    api.route('/papers', methods=['GET'])(paper_controller.get_papers)
    api.route('/login', methods=['POST'])(auth_controller.login)
    api.route('/register', methods=['POST'])(auth_controller.register)
    
    app.register_blueprint(api, url_prefix='/api')
