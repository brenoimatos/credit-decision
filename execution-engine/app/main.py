from fastapi import FastAPI
import uvicorn
from utils.settings import config
from controllers.execution_controller import router as PolicyRouter
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(title=config.PROJECT_NAME)


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
