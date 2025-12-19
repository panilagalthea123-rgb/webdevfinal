from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS (frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all during development
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- MODELS --------
class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

# -------- ROUTES --------
@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/register")
def register_user(user: RegisterRequest):
    # For now, we just return the data (no DB yet)
    return {
        "status": "success",
        "message": "User registered successfully",
        "user": {
            "username": user.username,
            "email": user.email
        }
    }
