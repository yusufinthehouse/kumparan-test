const month = [];
month[1] = "January";
month[2] = "February";
month[3] = "Maret";
month[4] = "April";
month[5] = "Mei";
month[6] = "Juni";
month[7] = "Juli";
month[8] = "Agustus";
month[9] = "September";
month[10] = "Oktober";
month[11] = "November";
month[11] = "Desember";

export function today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    return `${dd}/${mm}/${yyyy}`;
}

export function readableCompleteDate(data) {
    var date = new Date(parseInt(data));
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    return `${dd} ${month[date.getMonth() + 1]} ${yyyy} ${hour}:${minute}`;
}

export function getTimeOnly(data) {
    var date = new Date(parseInt(data));
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    return `${hour}:${minute}`;
}

export function money(data) {
    return data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
}