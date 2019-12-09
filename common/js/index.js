import {
	httpAjax
} from '@/common/js/http.js'
//获取设备分组
const getGroupingIndex = params => httpAjax('Grouping/index', params);
//添加分组 
const getGroupingAdd = params => httpAjax('Grouping/add', params);
//分组删除
const getGroupingDel = params => httpAjax('Grouping/del', params);
// 修改分组
const getGroupingUpdate = params => httpAjax('Grouping/update', params);
//分组排序
const getGroupingGrouping_num=params=>httpAjax('Grouping/grouping_num',params);
//获取设备+分组信息
const getDevicelistIndex=params=>httpAjax("Devicelist/index",params);
//共享设备：设备共享人列表
const getShareddeviceIndex=params=>httpAjax('Shareddevice/index',params);
//共享设备：设备共享解绑
const getShareddeviceDel_device=params=>httpAjax('Shareddevice/del_device',params);
//共享设备：设备共享添加用户
const getShareddeviceDevice_user_add=params=>httpAjax('Shareddevice/device_user_add',params);
//首页被共享人的弹框
const getElasticframeIndex=params=>httpAjax('Elasticframe/index',params);

//首页共享人列表
const getDevicelistPublic_device=params=>httpAjax('Devicelist/public_device',params);
//首页被共享人的同意或者拒绝
const getElasticframeShare_bool=params=>httpAjax('Elasticframe/share_bool',params);
//添加设备
const getDevicelistDevice_add=params=>httpAjax('Devicelist/device_add',params);
//修改设备名称
const getDevicelistevice_name_update=params=>httpAjax('Devicelist/device_name_update',params);
//删除设备
const getDevicelistDevice_del=params=>httpAjax('Devicelist/device_del',params);
//设备定时列表
const getTimerIndex=params=>httpAjax('Timer/index',params);
//设备新增定时
const getTimerimer_add=params=>httpAjax('Timer/timer_add',params);
//设备删除定时
const getTimerTimer_del=params=>httpAjax('Timer/timer_del',params);
//设备修改定时
const getTimerTimer_edit=params=>httpAjax('Timer/timer_edit',params);
//设备开关
const getDevicelistDevice_state=params=>httpAjax('Devicelist/device_state',params);
//设备检查设备状态
const getDevicelistDevice_details=params=>httpAjax('Devicelist/device_details',params);
//设备异常被动弹框
const getElasticframeAbnormal_list=params=>httpAjax('Elasticframe/abnormal_list',params);
//设备异常点击使用或暂不使用触发
const getElasticframeAbnormal__state=params=>httpAjax('Elasticframe/abnormal__state',params);
//设备分组修改
const getDevicelistDevice_class_edit=params=>httpAjax('Devicelist/device_class_edit',params);
//设备分组修改
const getloginAuthorization=params=>httpAjax('login/authorization',params);
//设备修改定时开关
const getTimerEquipment_state=params=>httpAjax('Timer/equipment_state',params);
//设备修改定时开关
const getDevicelistDevice_untying=params=>httpAjax('Devicelist/device_untying',params);
//设备名称默认值
const getDevicelisDevice_name_default=params=>httpAjax('Devicelist/device_name_default',params);
//设备名称默认值
const getDevicelistDevice_user_bind=params=>httpAjax('Devicelist/device_user_bind',params);
//设备操作记录
const getOperationDevice_operation=params=>httpAjax('Operation/device_operation',params);
//设备操作记录
const getDevicelistDevice_user_to_update=params=>httpAjax('Devicelist/device_user_to_update',params);
export {
	getGroupingIndex,
	getGroupingAdd,
	getGroupingDel,
	getGroupingUpdate,
	getGroupingGrouping_num,
	getDevicelistIndex,
	getShareddeviceIndex,
	getShareddeviceDel_device,
	getShareddeviceDevice_user_add,
	getDevicelistPublic_device,
	getElasticframeIndex,
	getElasticframeShare_bool,
	getDevicelistDevice_add,
	getDevicelistevice_name_update,
	getDevicelistDevice_del,
	getTimerIndex,
	getTimerimer_add,
	getTimerTimer_del,
	getTimerTimer_edit,
	getDevicelistDevice_state,
	getDevicelistDevice_details,
	getElasticframeAbnormal_list,
	getElasticframeAbnormal__state,
	getDevicelistDevice_class_edit,
	getloginAuthorization,
	getTimerEquipment_state,
	getDevicelistDevice_untying,
	getDevicelisDevice_name_default,
	getDevicelistDevice_user_bind,
	getOperationDevice_operation,
	getDevicelistDevice_user_to_update
}
