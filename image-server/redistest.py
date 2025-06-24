from services.ImageStore import store
import json

redis_client = store.redis
def send_tasks_to_redis():
    # Connect to Redis server
    

    # Queue name
    queue_name = 'proctoring'

    # Tasks to send
    tasks = [
        {"task_id": 1, "description": "Task 1"},
        {"task_id": 2, "description": "Task 2"},
        {"task_id": 3, "description": "Task 3"},
        {"task_id": 4, "description": "Task 4"},
        {"task_id": 5, "description": "Task 5"}
    ]

    # Push tasks to the Redis queue
    for task in tasks:
        redis_client.rpush(queue_name, json.dumps(task))
        print(f"Task {task['task_id']} added to queue '{queue_name}'.")

# Example usage
if __name__ == "__main__":
    send_tasks_to_redis()