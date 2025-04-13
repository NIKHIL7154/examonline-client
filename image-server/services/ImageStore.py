import redis
import json
import numpy as np

from helpers.TypeStore import Response

class ImageStore:
    def __init__(self):
        self.redis = redis.Redis(host="localhost", port=6379, db=0)

    def add_image(self, image_id, image_np,expiry=None):
        """
        Stores an image as bytes along with its shape in Redis.
        """
        shape = image_np.shape  # (height, width, channels)
        image_bytes = image_np.tobytes()
        
        # Store both image bytes and shape as JSON
        data = {"shape": shape, "image": image_bytes.hex()}  # Convert bytes to hex for Redis
        self.redis.set(image_id, json.dumps(data),ex=expiry)  # Set expiry in seconds

    def get_image(self, image_id):
        """
        Retrieves an image from Redis and converts it back to a NumPy array.
        """
        data_json = self.redis.get(image_id)
        if data_json is None:
            raise Exception(f"Image with ID {image_id} does not exist.")

        # Load data from JSON
        data = json.loads(data_json)
        shape = tuple(data["shape"])  # Convert shape back to tuple
        image_bytes = bytes.fromhex(data["image"])  # Convert hex back to bytes

        # Convert back to NumPy array
        image_np = np.frombuffer(image_bytes, dtype=np.uint8).reshape(shape)
        return image_np

    def push_event(self, event:Response):
        
        # Pushes an event to a Redis list.
        # The event is serialized to JSON format before being pushed.
        parsed=event.to_json()
        self.redis.rpush("proctoring", parsed)
        
        

store=ImageStore()

"""
# Set key with expiry (in seconds)
r.set("mykey", "myvalue", ex=10)  # Expires in 10 seconds

# Set key with expiry (in milliseconds)
r.set("mykey_ms", "myvalue", px=5000)  # Expires in 5000 milliseconds (5 seconds)
"""