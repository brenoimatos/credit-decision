from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DEBUG_MODE: bool
    HOST: str
    PORT: int
    DB_NAME: str
    DB_URL: str


config = Settings()
