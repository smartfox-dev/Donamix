import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import toast from 'react-hot-toast';

declare global {
    interface Window {
        Echo: Echo;
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'e1d8debb6b5791133889', // Replace with your actual key
    cluster: 'ap2', // Replace with your actual cluster
    wsHost: window.location.hostname,
    wsPort: 6001, // Make sure this matches the port your WebSocket server is running on
    wssPort: 6001, // For secure WebSocket connections
    disableStats: false,
    encrypted: false, // Set to true if you are using `wss://`
    enabledTransports: ["ws", "wss"], // Only use WebSocket for transport (no polling)
    forceTLS: false // Set to true if using `wss://`
});

