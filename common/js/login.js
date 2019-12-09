import {httpAjax} from '@/common/js/http.js'
//手机登陆
 const getLogin=params=>httpAjax('login/index',params);
 //验证码
 const getloginMsg_translate=params=>httpAjax('login/msg_translate',params);
 export{
	getLogin,
	 getloginMsg_translate
 }