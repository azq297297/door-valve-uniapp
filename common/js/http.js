const baseUrl = 'https://famen.kaituocn.com/api/'; // mock地址


const httpAjax = (url, data, method = 'post') => {
	//获取token
	let token = uni.getStorageSync('token');
	//获取手机号
	let phone = uni.getStorageSync('phone');
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}${url}`,
			method: method,
			data,
			header: {
				token: token,
				phone: phone
			},
			success: (res) => {
				console.log(res);
				if (res.statusCode == 200) {

					if (res.data.code == 2004) {
						uni.clearStorage();
						resolve(res.data);

					} else if (res.data.code == 2003) {
						//token失效清空缓存
						uni.clearStorage();
						resolve(res.data);
					} else {
						resolve(res.data);
					}
					// switch (res.data.code){
					// 	
					// }
				}

			},
			fail: (error) => {
				reject(error);
			},
		});
	});
};


export {
	httpAjax
	
};
