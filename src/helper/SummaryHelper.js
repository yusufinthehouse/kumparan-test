export function jobSummary(data) {
    var summary = { success: 0, failed: 0, submitted: 0, cod: 0, collected: 0 };
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key].isSubmitted) {
                summary.submitted += 1;
            } else {
                switch (data[key].status) {
                    case 'success':
                        summary.success += 1;
                        break;
                    case 'failed':
                        summary.failed += 1;
                }
            }

            if (data[key].status == 'success' && !data[key].isSubmitted) {
                summary.collected += parseInt(data[key].codAmmount ? data[key].codAmmount : 0);
            }
            else {
                summary.cod += parseInt(data[key].codAmmount ? data[key].codAmmount : 0);
            }

        }
    }
    return summary;
}