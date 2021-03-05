from app import *

from flask_sqlalchemy import SQLAlchemy

from controllers.timeapi import *
from controllers.time import *


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dbs/stopwatch.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.debug = True

if __name__ == '__main__':
    app.run()