from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import FetchedValue

from app import *

db = SQLAlchemy(app)
class Timelist(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    elapsed_time = db.Column('elapsed_time', db.String(100))

    def __init__(self, id, elapsed_time):
        self.id = id
        self.elapsed_time = elapsed_time

    def save(self, commit=True):
        db.session.add(self)
        if commit:
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                raise e
        
    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           'id'         : self.id,
           'elapsed_time': self.elapsed_time,
       }