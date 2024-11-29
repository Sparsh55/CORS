import asyncio
import requests
from fastapi import FastAPI, WebSocket, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from model import Item, Price, SessionLocal, create_tables
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

origins = [
    "*",  # Allow all origins (use cautiously)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specify which origins are allowed
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allow these HTTP methods
    allow_headers=["X-Custom-Header", "Content-Type"],  # Allow custom headers
)

# Dependency to get the database session
async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

item_manager = ConnectionManager()
price_manager = ConnectionManager()

# Fetch and update data from the RuneScape API
ITEM_MAPPING_URL = "https://prices.runescape.wiki/api/v1/osrs/mapping"
LATEST_PRICES_URL = "https://prices.runescape.wiki/api/v1/osrs/latest"

async def fetch_and_update_data():
    async with SessionLocal() as db:
        # Fetch item mapping
        item_response = requests.get(ITEM_MAPPING_URL)
        if item_response.status_code == 200:
            items = item_response.json()
            for item in items:
                db_item = Item(id=int(item['id']), name=item['name'], description=item.get('description', ''))
                await db.merge(db_item)
            await db.commit()
        else:
            print(f"Failed to fetch item mapping: {item_response.status_code}")

        # Fetch latest prices
        price_response = requests.get(LATEST_PRICES_URL)
        if price_response.status_code == 200:
            prices = price_response.json()
            for item_id, price_info in prices['data'].items():
                db_price = Price(item_id=int(item_id), price=price_info['high'])
                await db.merge(db_price)
            await db.commit()
        else:
            print(f"Failed to fetch latest prices: {price_response.status_code}")

        # Broadcast updates
        await item_manager.broadcast({"type": "items", "data": items})
        await price_manager.broadcast({"type": "prices", "data": prices['data']})

# Background task to update prices periodically
@app.on_event("startup")
async def startup():
    await create_tables()
    asyncio.create_task(update_prices_periodically())

async def update_prices_periodically():
    while True:
        await fetch_and_update_data()
        await asyncio.sleep(60 * 60)  # Update every hour

# API endpoint to get top 20 items
@app.get("/items")
async def read_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item)) # Limit to top 20 items
    return result.scalars().all()

# API endpoint to get top 20 prices
@app.get("/prices")
async def read_prices(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Price))  # Limit to top 20 prices
    return result.scalars().all()

@app.websocket("/ws/items")
async def websocket_endpoint_items(websocket: WebSocket):
    await item_manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(60)  # Keep the connection alive
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        item_manager.disconnect(websocket)

@app.websocket("/ws/prices")
async def websocket_endpoint_prices(websocket: WebSocket):
    await price_manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(60)  # Keep the connection alive
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        price_manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
