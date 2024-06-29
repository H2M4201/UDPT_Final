from flask import Blueprint
from ..controllers import auth_controller, paper_controller, user_controller, author_controller

def register_views(app):
    api = Blueprint('api', __name__)
    
    api.route('/users', methods=['GET'])(user_controller.get_users)
    api.route('/papers', methods=['GET'])(paper_controller.get_papers)
    api.route('/latest_papers', methods=['GET'])(paper_controller.get_latest_papers_by_topic)
    api.route('/search_papers', methods=['GET'])(paper_controller.search_papers)
    api.route('/login', methods=['POST'])(auth_controller.login)
    api.route('/register', methods=['POST'])(auth_controller.register)
    api.route('/author/<int:author_id>', methods=['GET'])(author_controller.get_author_profile)
    api.route('/paper/<int:paper_id>', methods=['GET'])(paper_controller.get_paper_details)
    
    app.register_blueprint(api, url_prefix='/api')