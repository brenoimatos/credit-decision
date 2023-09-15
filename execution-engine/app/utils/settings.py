from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DEBUG_MODE: bool
    HOST: str
    PORT: int
    POLICY_API: str
    POLICY_ID: str = '64fe4c4059f7f891749600c2'
    PROJECT_NAME: str = 'ExecutionEngine'

config = Settings()
