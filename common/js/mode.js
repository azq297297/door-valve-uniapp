import {
	httpAjax
} from '@/common/js/http.js'
//修改回家模式或者离家模式
const getPatternLeaving_home = params => httpAjax('Pattern/leaving_home', params);
//获取所有情景模式
const getGroupingIndex = params => httpAjax('Grouping/index', params);
//获取所有情景模式
const getPatternTesting = params => httpAjax('Pattern/testing', params);
//获取所有情景模式
const getPatternSend_error = params => httpAjax('Pattern/send_error', params);
export {
	getPatternLeaving_home,
	getGroupingIndex,
	getPatternTesting,
	getPatternSend_error
}
