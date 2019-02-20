import AV from 'leancloud-storage';

// 注意：需要自己创建一个 leanCode.js 文件，其中导出 APP_ID 和 APP_KEY 即可
import leanCode from '../leanCode.js';

const {APP_ID, APP_KEY} = leanCode;

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


export default AV;