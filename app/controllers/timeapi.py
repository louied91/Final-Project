from app import *
from models.time_elapsed import Timelist

@app.route('/api/timelist')
def get_time_list():
    return jsonify(timelist=[i.serialize for i in Timelist.query.all()])

@app.route('/api/savetime', methods  = ['POST'])
def save_time_list():
    timelist = Timelist(elapsed_time=request.form['time'], id=None)
    timelist.save()
    return Response(response=None, status=None, headers=None, mimetype=None, content_type=None, direct_passthrough=False)