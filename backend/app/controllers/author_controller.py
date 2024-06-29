from flask import jsonify, request
from ..models import Author, Paper, Participation
from .. import db

def get_author_profile(author_id):
    author = Author.query.get(author_id)
    if not author:
        return jsonify({'error': 'Author not found'}), 404

    profile_data = author.profile_json_text

    papers = (db.session.query(Paper)
              .join(Participation, Paper.paper_id == Participation.paper_id)
              .filter(Participation.author_id == author_id)
              .order_by(Participation.date_added.desc())
              .all())

    profile = {
        'full_name': author.full_name,
        'website': author.website,
        'profile_json_text': profile_data,
        'papers': [paper.to_dict() for paper in papers]
    }

    return jsonify(profile)
