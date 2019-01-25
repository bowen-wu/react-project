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
        let month = date.getMonth() + 1;
        if(`${month}`.length === 1) {
            month = `0${month}`;
        }
        let date_ = date.getDate();
        if(`${date_}`.length === 1) {
            date_ = `0${date_}`;
        }
        return `${year}-${month}-${date_}`;
    },
    isWeChatBrowser(){
        return /micromessenger/.test(navigator.userAgent.toLowerCase());
    }
}

export default util;