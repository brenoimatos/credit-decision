from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DEBUG_MODE: bool
    HOST: str
    PORT: int
    POLICY_API: str
    PROJECT_NAME: str = 'ExecutionEngine'


config = Settings()
