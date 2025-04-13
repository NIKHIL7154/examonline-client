import { parentPort } from 'worker_threads';
import Redis from 'ioredis';
import { ProctorResponse } from '../../types/testConductTypes';
import { set } from 'mongoose';


const redisClient = new Redis();


async function processQueue() {
  try {
    console.log('[Worker] Waiting for tasks in the "proctoring" queue...');
    while (true) {
      const result = await redisClient.brpop('proctoring', 0);
      const [queue, task] = result as [string, string];
      handleTask(task);
    }
  } catch (err) {
    console.error('[Worker] Error processing queue: ', err);
  }
}

function handleTask(task: string) {
  const parsed: ProctorResponse = JSON.parse(task);
  

  // Example: send back info to the main thread
  parentPort?.postMessage({ type: 'processed', task: parsed });

  // You can also emit socket events here if the map is passed (or handled in the main thread)
}

// Start processing the queue
processQueue();

// Handle Redis errors
redisClient.on('error', (err) => {
  console.error('[Worker] Redis error:', err);
});

process.on('exit', () => {
    console.log('[Worker] Cleaning up Redis...');
    redisClient.quit(); // Gracefully close Redis connection
  });
