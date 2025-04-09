const Redis = require('ioredis');

// Create a Redis client
const redisClient = new Redis();

// Function to process tasks from the "proctoring" queue
async function processQueue() {
    try {
        console.log('Waiting for tasks in the "proctoring" queue...');
        while (true) {
            // Use BRPOP to block and wait for a task from the queue
            const result = await redisClient.brpop('proctoring', 0);
            
            const [queue, task] = result;

            

            // Process the task (you can add your custom logic here)
            handleTask(task);
        }
    } catch (err) {
        console.error('Error processing queue: ', err);
    }
}
count=0
// Function to handle the task
function handleTask(task) {
    const parsed= JSON.parse(task);
    console.log(`Parsed task: ${count}`, parsed);
    count++;
    
    // Add your task processing logic here
}

// Start processing the queue
processQueue();

// Handle errors
redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});