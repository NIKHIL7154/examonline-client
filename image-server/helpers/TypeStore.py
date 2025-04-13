# Task added to the queue
# and processed by the worker thread
import json
class Task:
    def __init__(self, image_id, test_image,socket_id):
        self.image_id = image_id
        self.test_image = test_image
        self.socket_id = socket_id
        self.user_id = image_id

# Response sent to node js
class Response:
    def __init__(self, multiple_person:int, socket_id:str, mobile_detection:int,cheating: bool,user_id:str):
        self.user_id = user_id
        self.multiple_person = multiple_person
        self.socket_id = socket_id
        self.mobile_detection = mobile_detection
        self.cheating=cheating
    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__)
    