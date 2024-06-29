from flask import jsonify
from sqlalchemy import extract
from datetime import datetime
from ..models import Paper, Topic, Participation
from .. import db

def get_papers():
    papers = Paper.query.all()
    return jsonify([paper.to_dict() for paper in papers])

def get_latest_papers_by_topic():
    current_year = datetime.now().year
    topics = Topic.query.all()
    result = []
    for topic in topics:
        papers = (db.session.query(Paper)
                  .join(Participation, Paper.paper_id == Participation.paper_id)
                  .filter(Paper.topic_id == topic.topic_id)
                  .filter(extract('year', Participation.date_added) == current_year)
                  .order_by(Participation.date_added.desc())
                  .limit(5)
                  .all())
        result.append({
            'topic_name': topic.topic_name,
            'papers': [paper.to_dict() for paper in papers]
        })
    return jsonify(result)