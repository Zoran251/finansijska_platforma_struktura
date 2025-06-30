class PerformanceMonitor {
    static metrics = {
        loadTimes: [],
        operationTimes: new Map(),
        errors: [],
        resourceUsage: new Map()
    };

    static startTime = Date.now();
    static maxMetrics = 100;

    static measureOperationTime(operationName, startTime) {
        const duration = Date.now() - startTime;
        
        if (!this.metrics.operationTimes.has(operationName)) {
            this.metrics.operationTimes.set(operationName, []);
        }
        
        const times = this.metrics.operationTimes.get(operationName);
        times.push(duration);
        
        // Održavaj maksimalnu veličinu niza
        if (times.length > this.maxMetrics) {
            times.shift();
        }

        // Log ako je operacija predugo trajala
        if (duration > 1000) { // više od 1 sekunde
            console.warn(`Operation ${operationName} took ${duration}ms`);
        }

        return duration;
    }

    static trackError(error, context) {
        this.metrics.errors.push({
            timestamp: new Date().toISOString(),
            error: error.message || error,
            context,
            stack: error.stack
        });

        // Održavaj maksimalnu veličinu niza
        if (this.metrics.errors.length > this.maxMetrics) {
            this.metrics.errors.shift();
        }
    }

    static measureResourceUsage() {
        if (performance && performance.memory) {
            const memory = performance.memory;
            this.metrics.resourceUsage.set('memory', {
                usedHeapSize: memory.usedJSHeapSize,
                totalHeapSize: memory.totalJSHeapSize,
                timestamp: Date.now()
            });
        }
    }

    static getAverageOperationTime(operationName) {
        const times = this.metrics.operationTimes.get(operationName);
        if (!times || times.length === 0) return 0;
        
        const sum = times.reduce((a, b) => a + b, 0);
        return sum / times.length;
    }

    static getMetricsSummary() {
        const summary = {
            uptime: Date.now() - this.startTime,
            operationAverages: {},
            errorCount: this.metrics.errors.length,
            memoryUsage: this.metrics.resourceUsage.get('memory')
        };

        for (const [operation, times] of this.metrics.operationTimes) {
            summary.operationAverages[operation] = this.getAverageOperationTime(operation);
        }

        return summary;
    }

    static startMonitoring() {
        // Periodično merenje resursa
        setInterval(() => {
            this.measureResourceUsage();
        }, 60000); // Svaki minut

        // Pratimo učitavanje resursa
        if (window.performance && performance.getEntriesByType) {
            performance.getEntriesByType('resource').forEach(resource => {
                this.metrics.loadTimes.push({
                    name: resource.name,
                    duration: resource.duration,
                    timestamp: Date.now()
                });
            });
        }
    }

    static wrapAsync(operationName, fn) {
        return async (...args) => {
            const startTime = Date.now();
            try {
                const result = await fn(...args);
                this.measureOperationTime(operationName, startTime);
                return result;
            } catch (error) {
                this.trackError(error, operationName);
                throw error;
            }
        };
    }

    static wrap(operationName, fn) {
        return (...args) => {
            const startTime = Date.now();
            try {
                const result = fn(...args);
                this.measureOperationTime(operationName, startTime);
                return result;
            } catch (error) {
                this.trackError(error, operationName);
                throw error;
            }
        };
    }
}
