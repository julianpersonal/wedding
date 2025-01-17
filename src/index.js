import { Amplify } from 'aws-amplify';
import { initializeInAppMessaging } from 'aws-amplify/in-app-messaging';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);
initializeInAppMessaging();