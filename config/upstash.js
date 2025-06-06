import { Client as WorkflowClient } from '@upstash/workflow';
import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

// Add debug logging
console.log('Initializing Upstash with:', {
    baseUrl: QSTASH_URL,
    hasToken: !!QSTASH_TOKEN
});

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
    retries: 3,
    debug: true // Enable debug mode
});

