from . import db

class User(db.Model):
    __tablename__ = 'USERS'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(10), nullable=False)
    user_type = db.Column(db.String(10), nullable=False)
    papers = db.relationship('Paper', backref='user', lazy=True)
    author = db.relationship('Author', back_populates='user', uselist=False, lazy=True)

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'status': self.status,
            'user_type': self.user_type
        }

class Author(db.Model):
    __tablename__ = 'AUTHORS'
    user_id = db.Column(db.Integer, db.ForeignKey('USERS.user_id'), primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    website = db.Column(db.String(255))
    profile_json_text = db.Column(db.Text)
    image_path = db.Column(db.String(255))
    user = db.relationship('User', back_populates='author')
    participations = db.relationship('Participation', backref='author', lazy=True)

class Paper(db.Model):
    __tablename__ = 'PAPERS'
    paper_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author_string_list = db.Column(db.String(255), nullable=False)
    abstract = db.Column(db.String(1000), nullable=False)
    conference_id = db.Column(db.Integer, db.ForeignKey('CONFERENCES.conference_id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('TOPICS.topic_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('USERS.user_id'), nullable=False)
    participations = db.relationship('Participation', backref='paper', lazy=True)

    def to_dict(self):
        return {
            'paper_id': self.paper_id,
            'title': self.title,
            'author_string_list': self.author_string_list,
            'abstract': self.abstract,
            'conference_id': self.conference_id,
            'topic_id': self.topic_id,
            'user_id': self.user_id
        }

class Participation(db.Model):
    __tablename__ = 'PARTICIPATION'
    author_id = db.Column(db.Integer, db.ForeignKey('AUTHORS.user_id'), primary_key=True)
    paper_id = db.Column(db.Integer, db.ForeignKey('PAPERS.paper_id'), primary_key=True)
    role = db.Column(db.String(30), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(10), nullable=False)

class Conference(db.Model):
    __tablename__ = 'CONFERENCES'
    conference_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    abbreviation = db.Column(db.String(10), nullable=False)
    conference_rank = db.Column(db.String(1), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    papers = db.relationship('Paper', backref='conference', lazy=True)

class Topic(db.Model):
    __tablename__ = 'TOPICS'
    topic_id = db.Column(db.Integer, primary_key=True)
    topic_name = db.Column(db.String(255), nullable=False)
    papers = db.relationship('Paper', backref='topic', lazy=True)
