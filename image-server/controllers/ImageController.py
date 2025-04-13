from fastapi import HTTPException

from services.ImageStore import store
from services.FaceService import face_verifier
from services.QueueService import add_task, Task

def storeImage(id: str, img):
    faces = face_verifier.detect_faces(img)
    if faces == 0:
        raise HTTPException(status_code=400, detail="No face detected in the image")
    elif faces > 1:
        raise HTTPException(status_code=400, detail="Multiple faces detected in the image")
    store.add_image(id, img, expiry=60*60*24)  # Store for 24 hours


def verifyImage(id: str, image,socket_id: str):
    if not store.redis.exists(id):
        raise HTTPException(status_code=404, detail="Image ID not found")
    task=Task(id, image,socket_id)
    add_task(task)
    
    
    
    


