import cv2

from deepface import DeepFace

class VerifyFace:
    def __init__(self):
        pass
    
    def detect_faces(self,image):
        # Convert the image to RGB format
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
       
        try:
            detections = DeepFace.extract_faces(image_rgb, detector_backend="opencv")  
            return len(detections)  # Number of detected faces
        except Exception as e:
            print(f"No face detected: {e}")
            return 0  # Return 0 if no face is detected
        # Use DeepFace to detect faces in the image
       
    
    def validate_image(self,stored_image,test_image):
        result = DeepFace.verify(
        stored_image,
        test_image,  # The image to be verified
        model_name="ArcFace",
        detector_backend="mtcnn",
        enforce_detection=True  # Ensure a face is detected
        )
        return result

face_verifier = VerifyFace()
        
        

    