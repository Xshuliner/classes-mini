/**
 * addMember
 * 注册成员
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 查询溯源主的信息
const querySourceInfo = async (data, db, strMemberId, date, time) => {
	let objSourceInfo = null
	// 查询溯源主的信息
	try {
		objSourceInfo = await db
			.collection('TB_MEMBER')
			.doc(data.share_sourceID)
			.get()
	} catch (e) {
		console.error('querySourceInfo error', e)
	}
	// 将溯源主信息加入到刚注册用户中
	if (objSourceInfo) {
		console.log('querySourceInfo', objSourceInfo.data.user_nickName)
		try {
			await db
				.collection('TB_MEMBER')
				.doc(strMemberId)
				.update({
					data: {
						share_sourceNickName: db.command.set(
							objSourceInfo.data.user_nickName
						),
					},
				})
		} catch (e) {
			console.error('updateMemberInfo error', e)
		}
	}
}

// 创建角色
const createMember = async (data, db, strMemberId, date, time) => {
	// 创建新用户
	const objMember = {
		// 创建基本信息
		_id: strMemberId, // 主键
		// 系统级
		app_countLogin: 0, // 登录次数
		app_createDate: date, // 创建时间
		app_createTime: time, // 创建时间
		app_loginDate: date, // 登录时间
		app_loginTime: time, // 登录时间
		app_updateDate: date, // 修改时间
		app_updateTime: time, // 修改时间
		// 溯源级
		share_sourceID: data.share_sourceID,
		share_sourceNickName: '',
		share_shareType: data.share_shareType,
		share_sharePath: data.share_sharePath,
		// 个人信息
		user_openid: strMemberId.substr(4),
		user_nickName: data.nickName, // 昵称*
		user_avatarUrl: data.avatarUrl, // 头像*
		user_gender: data.gender, // 性别*
		user_country: data.country, // 国家*
		user_province: data.province, // 省份*
		user_city: data.city, // 城市*
		user_language: data.language, // 语言*
		user_cellphone: data.cellphone, // 手机号
		// 应用信息
		data_level: 1, // 等级
		data_exp: 0, // 经验
		data_money: 0, // 经验
		// 冗余信息
		expand_arrShareChildrenList: [], // 邀请列表
		expand_arrJoinClassList: [], // 加入的班级
	}
	// 创建新的玩家信息
	try {
		await db.collection('TB_MEMBER').add({ data: objMember })
		objResult = {
			data: objMember,
		}
	} catch (e) {
		objResult = {
			data: e,
		}
		console.error('addMemberInfo error', e)
	}

	return objResult
}

// 更新溯源主的邀请信息
const updateSourceInfo = async (data, db, strMemberId, date, time) => {
	// 将溯源主信息加入到刚注册用户中
	try {
		await db
			.collection('TB_MEMBER')
			.doc(data.share_sourceID)
			.update({
				data: {
					expand_arrShareChildrenList: db.command.addToSet({
						_id: strMemberId,
						nickName: data.nickName, // 昵称*
						avatarUrl: data.avatarUrl, // 头像*
						gender: data.gender, // 性别*
						joinDate: date, // 加入时间
						joinTime: time, // 加入时间
						shareType: data.share_shareType,
						sharePath: data.share_sharePath,
					}),
				},
			})
	} catch (e) {
		console.error('updateSourceInfo error', e)
	}
}

async function addMemberInfo(data, db, strMemberId) {
	let objResult = {}
	let objMemberInfo = undefined
	const date = new Date()
	const YYYY = date.getFullYear()
	const MM = date.getMonth() + 1
	const DD = date.getDate()
	const hh = date.getHours()
	const mm = date.getMinutes()
	const ss = date.getSeconds()
	const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`

	try {
		objMemberInfo = await db.collection('TB_MEMBER').doc(strMemberId).get()
	} catch (e) {
		console.error('queryMemberInfo error', e)
	}

	if (objMemberInfo) {
		// 已经注册过注册
		objResult = {
			data: objMemberInfo.data,
		}
	} else {
		// 尚未注册过
		// 创建角色
		objResult = await createMember(data, db, strMemberId, date, time)
		if (data.share_sourceID) {
			// 查询溯源主的信息
			await querySourceInfo(data, db, strMemberId, date, time)
			// 更新溯源主的邀请信息
			await updateSourceInfo(data, db, strMemberId, date, time)
		}
	}

	return objResult
}

module.exports = addMemberInfo