from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import DeferredReflection
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import StaticPool
from os import environ


class Reflected(DeferredReflection):
    __abstract__ = True


user = environ["USER"]
DATABASE_URL = f"postgresql://{user}:@localhost/lupus_db"
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

DBSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Testing
DATABASE_URL = f"postgresql://{user}:@localhost/test_lupus_db"
test_engine = create_engine(DATABASE_URL,
                            pool_pre_ping=True,
                            poolclass=StaticPool)

TestDBSession = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
