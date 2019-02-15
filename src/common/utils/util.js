function addZero(value) {
    let val = value;
    if(`${val}`.length === 1) {
        val = `0${val}`;
    }
    return val;
}

const util = {
    telephoneVerfication(telephone) {
        return /^1[3|4|5|7|8]\d{9}$/.test(telephone);
    },
    idCardVerfication(id) {
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(id);
    },
    timeStampChangeDate(timeStamp) {
        let date = new Date(timeStamp);
        let year = date.getFullYear();
        let month = addZero(date.getMonth() + 1);
        let date_ = addZero(date.getDate());
        let hour = addZero(date.getHours());
        let minutes = addZero(date.getMinutes());
        return `${year}-${month}-${date_} ${hour}:${minutes}`;
    },

    dateChangeTimeStamp(date) {
        return Date.parse(date);
    }
}

export default util;