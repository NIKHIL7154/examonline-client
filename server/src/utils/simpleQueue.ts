type QueueTask = () => Promise<void>;

export default class SimpleQueue {
    private queue: QueueTask[];
    private isProcessing: boolean;

    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    // Add a task to the queue
    enqueue(task: QueueTask) {
        this.queue.push(task);
        this.processQueue(); // Start processing the queue
    }

    // Process the queue
    async processQueue() {
        if (this.isProcessing) return; // Prevent multiple processing

        this.isProcessing = true;

        while (this.queue.length > 0) {
            const task = this.queue.shift(); // Get the next task
            if (task) { // Check if task is defined
                try {
                    await task(); // Execute the task
                } catch (error) {
                    console.error('Error processing task:', error);
                }
            }
        }

        this.isProcessing = false; // Mark processing as complete
    }
}
