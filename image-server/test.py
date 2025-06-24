import cv2

from services.ImageStore import store
from services.FaceService import face_verifier


# Load image as NumPy array
image_path = "first.jpg"
image_np = cv2.imread(image_path)  
stored_image=store.get_image("nikhlu")
result=face_verifier.validate_image(stored_image,image_np)
print("Result:", result)


