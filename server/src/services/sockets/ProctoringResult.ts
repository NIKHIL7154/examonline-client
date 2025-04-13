
import { UserManagerStore } from "./UserManagerStore";
import { ProctorResponse } from '../../types/testConductTypes';


import path from 'path';
import { Worker } from 'worker_threads';
import { log } from "console";

const { getUser, hasUser, updateUser } = UserManagerStore();

function handleTask(task: ProctorResponse) {

    console.log("Task given ", task);
    if(!hasUser(task.user_id)){
        console.log("User not found in the store, ignoring task.");
        return;
    }
    const user = getUser(task.user_id);
    user.imagesAnalyzed += 1;
    if (task.cheating) {
        console.log("Cheating Detected!")
        console.log("User ID: ", task.user_id);
        user.socket.emit('proctoring',{message:"We have detected an suspicious activity, please stop it!"});
        user.mobileDetectionCount+= task.mobile_detection;
        user.anotherPersonCount+= task.multiple_person;
        user.cheatingCount+= 1;
        
    }

}




export function startWorker(){

// Spawn the worker
const worker = new Worker(path.resolve(__dirname, '../workers/proctor.worker.ts'), {
  execArgv: ['-r', 'ts-node/register'], // Required if using ts-node
});

// Receive messages from the worker
worker.on('message', (data) => {
  console.log('[Main] Message from worker:', data);
  handleTask(data.task); // Call the function to handle the task

  // Optional: use socket.io here
  // const socket = users.get(data.userId);
  // if (socket) socket.emit('proctor-event', data);
});

worker.on('error', (err) => {
  console.error('[Main] Worker error:', err);
});

worker.on('exit', (code) => {
  console.log(`[Main] Worker exited with code ${code}`);
});

}
