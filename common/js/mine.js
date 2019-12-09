import {httpAjax} from '@/common/js/http.js'
//获取消息列表
const getMessage=params=>httpAjax('Message/index',params);
//获取常见问题列表
const getProblem=params=>httpAjax('Problem/index',params);
//获取常见问题详情
const getProblemProblem_details=params=>httpAjax('Problem/problem_details',params);
//获取操作记录
const getOperation=params=>httpAjax('Operation/index',params);
//系统反馈信息
const getFeedbackIndex=params=>httpAjax('Feedback/index',params);
//消息通知
const getMessageIndex=params=>httpAjax('Message/index',params);
export{
	getMessage,
	getProblem,
	getOperation,
	getFeedbackIndex,
	getProblemProblem_details,
	getMessageIndex
}
