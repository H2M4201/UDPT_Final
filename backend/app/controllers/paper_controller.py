from flask import jsonify
from ..models import Paper

def get_papers():
    papers = Paper.query.all()
    return jsonify([paper.to_dict() for paper in papers])
