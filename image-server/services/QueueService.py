import queue
import threading
from services.ImageStore import store
from services.FaceService import face_verifier
from helpers.TypeStore import Task, Response

task_queue: queue.Queue[Task] = queue.Queue()

# Create a thread-safe queue to hold tasks
def worker():
    while True:
        n=task_queue.qsize()
        if(n<1):
            break
        task = task_queue.get()
        stored_image=store.get_image(task.image_id)
        faces=face_verifier.detect_faces(task.test_image)
        print(task)
        res=Response(0,task.socket_id,0,False,task.user_id)
        
        
        
        if(faces == 0):
            res.cheating=True
        elif(faces > 1):
            res.cheating=True
            res.multiple_person=1
        else:
            result = face_verifier.validate_image(stored_image, task.test_image)
            if result["verified"]:
                res.cheating=False
            else:
                res.cheating=True    

        store.push_event(res)
        
        task_queue.task_done()
        
# Start a worker thread
thread = threading.Thread(target=worker)
thread.start()

# Function to add a task to the queue and start the worker thread if not already running
def add_task(task):
    global thread
    task_queue.put(task)
    if not thread.is_alive():
        thread = threading.Thread(target=worker)
        thread.start()
    




