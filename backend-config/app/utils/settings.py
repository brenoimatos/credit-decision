from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DEBUG_MODE: bool
    HOST: str 
    PORT: int
    DB_URL: str

    DB_NAME: str = 'PolicyDB'
    DB_COLLECTION: str = 'policies'
    PROJECT_NAME: str = 'ConfigBackend'


config = Settings()
