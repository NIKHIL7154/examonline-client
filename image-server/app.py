from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, HTTPException
from controllers.ImageController import storeImage, verifyImage
import numpy as np
import cv2
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_image(file: UploadFile):
    """Convert uploaded file to OpenCV image (NumPy array)."""
    file_bytes = np.frombuffer(file.file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    return image


@app.post("/store")
async def store_image(user_id: str, image: UploadFile = File(...)):
    """Store the uploaded image."""
    try:
        storeImage(user_id, read_image(image))
        return {"message": "Image Verified"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/verify")
async def verify_person(user_id: str,socket_id:str, image: UploadFile = File(...)):
    """Verify if the uploaded image matches the stored image."""
    try:
        verifyImage(user_id, read_image(image),socket_id)
        return {"message": "Image Processed"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
