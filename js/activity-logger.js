class ActivityLogger {
    static activities = [];
    static maxActivities = 1000;

    static logActivity(userId, action, details) {
        const activity = {
            id: Date.now(),
            userId,
            action,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            platform: navigator.platform
        };

        this.activities.unshift(activity);
        
        // Održavaj maksimalnu veličinu loga
        if (this.activities.length > this.maxActivities) {
            this.activities.pop();
        }

        // Sačuvaj u localStorage
        this.saveActivities();

        return activity;
    }

    static saveActivities() {
        try {
            localStorage.setItem('activityLog', JSON.stringify(this.activities));
        } catch (e) {
            console.error('Error saving activity log:', e);
            // Ako je localStorage pun, obriši starije aktivnosti
            if (e.name === 'QuotaExceededError') {
                this.activities = this.activities.slice(0, this.activities.length / 2);
                this.saveActivities();
            }
        }
    }

    static loadActivities() {
        try {
            const saved = localStorage.getItem('activityLog');
            if (saved) {
                this.activities = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading activity log:', e);
            this.activities = [];
        }
    }

    static getUserActivities(userId) {
        return this.activities.filter(a => a.userId === userId);
    }

    static getRecentActivities(limit = 50) {
        return this.activities.slice(0, limit);
    }

    static clearUserActivities(userId) {
        this.activities = this.activities.filter(a => a.userId !== userId);
        this.saveActivities();
    }

    static searchActivities(query) {
        const searchStr = query.toLowerCase();
        return this.activities.filter(a => 
            a.action.toLowerCase().includes(searchStr) ||
            JSON.stringify(a.details).toLowerCase().includes(searchStr)
        );
    }

    static getActivityStats(userId = null) {
        const activities = userId ? 
            this.getUserActivities(userId) : 
            this.activities;

        return {
            total: activities.length,
            byAction: activities.reduce((acc, curr) => {
                acc[curr.action] = (acc[curr.action] || 0) + 1;
                return acc;
            }, {}),
            lastActivity: activities[0]?.timestamp
        };
    }

    static init() {
        this.loadActivities();
        
        // Automatsko čuvanje na intervalima
        setInterval(() => this.saveActivities(), 5 * 60 * 1000); // Svakih 5 minuta
    }
}
