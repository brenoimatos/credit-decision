import certifi
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn
from utils.settings import config
from controllers.execution_controller import router as PolicyRouter
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(title=config.PROJECT_NAME)

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(config.DB_URL, tlsCAFile=certifi.where())
    print(config.DB_URL)
    app.mongodb = app.mongodb_client[config.DB_NAME]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(PolicyRouter, tags=["Execution"], prefix="/execution")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=config.HOST,
        reload=config.DEBUG_MODE,
        port=config.PORT
    )
