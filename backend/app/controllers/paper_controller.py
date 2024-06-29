from flask import jsonify
from sqlalchemy import extract
from datetime import datetime
from flask import request
from ..models import Paper, Topic, Participation, Conference, Author
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

def search_papers():
    query = db.session.query(Paper)
    title = request.args.get('title')
    author_name = request.args.get('author')
    conference_name = request.args.get('conference')
    year = request.args.get('year')
    topic_name = request.args.get('topic')

    if title:
        query = query.filter(Paper.title.ilike(f'%{title}%'))
    if author_name:
        query = query.join(Participation, Paper.paper_id == Participation.paper_id)\
                     .join(Author, Participation.author_id == Author.user_id)\
                     .filter(Author.full_name.ilike(f'%{author_name}%'))
    if conference_name:
        query = query.join(Conference, Paper.conference_id == Conference.conference_id)\
                     .filter(Conference.name.ilike(f'%{conference_name}%'))
    if year:
        query = query.join(Participation, Paper.paper_id == Participation.paper_id)\
                     .filter(extract('year', Participation.date_added) == int(year))
    if topic_name:
        query = query.join(Topic, Paper.topic_id == Topic.topic_id)\
                     .filter(Topic.topic_name.ilike(f'%{topic_name}%'))

    papers = query.all()
    return jsonify([paper.to_dict() for paper in papers])