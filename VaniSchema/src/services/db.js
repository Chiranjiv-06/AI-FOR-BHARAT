// reliable-db.js
// A robust, local-first database simulation that persists data
// and syncs across tabs in real-time.

const DB_KEY = 'vanischema_db_v1';

// Initialize DB if empty
const initDB = () => {
    if (!localStorage.getItem(DB_KEY)) {
        const initialData = [
            { id: 101, user: "Ramesh Pawar", scheme: "Kisan Credit Card", status: "Pending", date: "2024-10-24", location: "Nashik" },
            { id: 102, user: "Suresh Patil", scheme: "PM Awas Yojana", status: "Approved", date: "2024-10-23", location: "Pune" },
            { id: 103, user: "Anita Desai", scheme: "Sukanya Samriddhi", status: "Rejected", date: "2024-10-22", location: "Mumbai" },
        ];
        localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    }
};

export const db = {
    getAll: () => {
        initDB();
        return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    },

    add: (application) => {
        const data = db.getAll();
        const newApp = { ...application, id: Date.now() };
        data.unshift(newApp); // Add to top
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        // Trigger generic storage event for other tabs
        window.dispatchEvent(new Event('storage'));
        return newApp;
    },

    updateStatus: (id, status) => {
        const data = db.getAll();
        const updatedData = data.map(item =>
            item.id === id ? { ...item, status: status } : item
        );
        localStorage.setItem(DB_KEY, JSON.stringify(updatedData));
        window.dispatchEvent(new Event('storage'));
    },

    // Subscribe to changes (Real-time listener)
    subscribe: (callback) => {
        const handler = () => {
            callback(db.getAll());
        };

        window.addEventListener('storage', handler);
        // Also listen to custom events for same-tab updates
        window.addEventListener('local-db-update', handler);

        return () => {
            window.removeEventListener('storage', handler);
            window.removeEventListener('local-db-update', handler);
        };
    }
};

// Override setItem to dispatch custom event for same-tab sync
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
    const event = new Event('local-db-update');
    originalSetItem.apply(this, arguments);
    window.dispatchEvent(event);
};
