class DataExportService {
    static async exportToCSV(data, filename) {
        try {
            const csvContent = this.convertToCSV(data);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            return true;
        } catch (error) {
            console.error('Export error:', error);
            return false;
        }
    }

    static convertToCSV(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return '';
        }

        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => {
                    let cell = row[header];
                    // Konvertuj u string i očisti specijalne karaktere
                    cell = cell === null || cell === undefined ? '' : cell.toString();
                    cell = cell.replace(/"/g, '""');
                    // Dodaj navodnike ako cell sadrži zarez ili nove redove
                    return cell.includes(',') || cell.includes('\n') ? `"${cell}"` : cell;
                }).join(',')
            )
        ];

        return csvRows.join('\n');
    }

    static async exportToJSON(data, filename) {
        try {
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const link = document.createElement('a');
            
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            return true;
        } catch (error) {
            console.error('Export error:', error);
            return false;
        }
    }

    static generateReport(transactions, startDate, endDate) {
        // Filter transactions by date range
        const filteredTransactions = transactions.filter(t => {
            const date = new Date(t.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });

        // Calculate summaries
        const summary = {
            totalIncome: 0,
            totalExpense: 0,
            byCategory: {},
            byMonth: {}
        };

        filteredTransactions.forEach(t => {
            // Update totals
            if (t.type === 'income') {
                summary.totalIncome += t.amount;
            } else {
                summary.totalExpense += t.amount;
            }

            // Update category totals
            if (!summary.byCategory[t.category]) {
                summary.byCategory[t.category] = { income: 0, expense: 0 };
            }
            summary.byCategory[t.category][t.type] += t.amount;

            // Update monthly totals
            const month = new Date(t.date).toLocaleDateString('sr-RS', { 
                year: 'numeric', 
                month: 'long' 
            });
            if (!summary.byMonth[month]) {
                summary.byMonth[month] = { income: 0, expense: 0 };
            }
            summary.byMonth[month][t.type] += t.amount;
        });

        return {
            period: { startDate, endDate },
            summary,
            transactions: filteredTransactions
        };
    }

    static async exportReport(data, format = 'pdf') {
        try {
            const filename = `financial-report-${new Date().toISOString().split('T')[0]}.${format}`;
            
            switch (format.toLowerCase()) {
                case 'csv':
                    return await this.exportToCSV(data.transactions, filename);
                case 'json':
                    return await this.exportToJSON(data, filename);
                case 'pdf':
                    return await this.exportToPDF(data, filename);
                default:
                    throw new Error(`Unsupported format: ${format}`);
            }
        } catch (error) {
            console.error('Report export error:', error);
            return false;
        }
    }

    static async exportToPDF(data, filename) {
        // Implementacija PDF exporta bi zahtevala eksternu biblioteku
        console.log('PDF export would go here', data, filename);
        return false;
    }
}
