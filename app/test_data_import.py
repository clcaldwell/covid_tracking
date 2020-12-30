import os
import tempfile
import pytest
from data_import import connect_db
#import flask_host

def test_connect_db():
    assert connect_db == buildSession()
#@pytest.fixture
#def client():
    #db_fd, flask_host.app.config['DATABASE'] = tempfile.mkstemp()
    #flask_host.app.config['TESTING'] = True

    #with flaskr.app.test_client() as client:
        #with flaskr.app.app_context():
            #flaskr.init_db()
        #yield client

    #os.close(db_fd)
    #os.unlink(data_import.app.config['DATABASE'])