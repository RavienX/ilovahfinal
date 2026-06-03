// Cloud Functions entry. Each handler lives in src/ and is exported here.
import { onLeadCreated } from './src/onLeadCreated.js';
import { onJobCompleted } from './src/onJobCompleted.js';
import { dailyReviewRequests } from './src/scheduledReminders.js';

export { onLeadCreated, onJobCompleted, dailyReviewRequests };
