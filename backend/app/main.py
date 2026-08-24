from fastapi import FastAPI

app = FastAPI(title="Knot API")


@app.get("/health")
async def health():
    return {"status": "ok"}