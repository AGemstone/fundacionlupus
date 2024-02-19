from db.engine import DBSession, engine, Reflected
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm.exc import UnmappedClassError


def get_db():
    db = DBSession()
    try:
        db.connection()
        yield db
    except OperationalError:
            print("Connection to the database is not available")
    except UnmappedClassError:
        try:
            Reflected.prepare(engine)
        except OperationalError:
            print("Connection to the database is not available")
    finally:
        db.close()
