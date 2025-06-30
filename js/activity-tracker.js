class ActivityTracker {
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
            platform: navigator.platform,
            location: window.location.pathname
        };

        this.activities.unshift(activity);
        
        // Održavaj maksimalnu veličinu
        if (this.activities.length > this.maxActivities) {
            this.activities.pop();
        }

        // Sačuvaj aktivnosti
        this.saveActivities();

        return activity;
    }

    static getActivities(userId = null, limit = 50) {
        let filtered = this.activities;
        
        if (userId) {
            filtered = filtered.filter(a => a.userId === userId);
        }
        
        return filtered.slice(0, limit);
    }

    static getActivityStats(userId = null) {
        let activities = userId ? 
            this.activities.filter(a => a.userId === userId) : 
            this.activities;

        return {
            total: activities.length,
            byType: this.groupActivitiesByType(activities),
            byDate: this.groupActivitiesByDate(activities),
            mostRecent: activities[0]
        };
    }

    static groupActivitiesByType(activities) {
        return activities.reduce((acc, curr) => {
            acc[curr.action] = (acc[curr.action] || 0) + 1;
            return acc;
        }, {});
    }

    static groupActivitiesByDate(activities) {
        return activities.reduce((acc, curr) => {
            const date = curr.timestamp.split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
    }

    static searchActivities(query, userId = null) {
        const searchStr = query.toLowerCase();
        let filtered = this.activities;
        
        if (userId) {
            filtered = filtered.filter(a => a.userId === userId);
        }
        
        return filtered.filter(a => 
            a.action.toLowerCase().includes(searchStr) ||
            JSON.stringify(a.details).toLowerCase().includes(searchStr)
        );
    }

    static saveActivities() {
        try {
            localStorage.setItem('activityLog', JSON.stringify(this.activities));
        } catch (e) {
            console.error('Error saving activities:', e);
            if (e.name === 'QuotaExceededError') {
                // Ako je localStorage pun, smanji broj aktivnosti
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
            console.error('Error loading activities:', e);
            this.activities = [];
        }
    }

    static clearActivities(userId = null) {
        if (userId) {
            this.activities = this.activities.filter(a => a.userId !== userId);
        } else {
            this.activities = [];
        }
        this.saveActivities();
    }

    static generateActivityReport(userId = null, startDate = null, endDate = null) {
        let activities = this.activities;
        
        if (userId) {
            activities = activities.filter(a => a.userId === userId);
        }
        
        if (startDate) {
            activities = activities.filter(a => new Date(a.timestamp) >= new Date(startDate));
        }
        
        if (endDate) {
            activities = activities.filter(a => new Date(a.timestamp) <= new Date(endDate));
        }

        return {
            period: {
                start: startDate || activities[activities.length - 1]?.timestamp,
                end: endDate || activities[0]?.timestamp
            },
            totalActivities: activities.length,
            statistics: {
                byType: this.groupActivitiesByType(activities),
                byDate: this.groupActivitiesByDate(activities)
            },
            activities: activities
        };
    }

    static init() {
        this.loadActivities();
        
        // Automatsko čuvanje na intervalima
        setInterval(() => this.saveActivities(), 5 * 60 * 1000); // Svakih 5 minuta
    }
}
