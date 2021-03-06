import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { AtButton, AtFloatLayout } from 'taro-ui'
import { View } from '@tarojs/components'
import api from '@/api'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import memberInfoActions from '@/redux/actions/memberInfo'
import { checkObjectEmpty } from '@/utils/index'

import './index.less'

interface ILayoutLoginParam {}

export default function LayoutLogin(props: ILayoutLoginParam) {
	const {} = props

	const { shareInfo } = useSelector(state => state)
	const { isShowLayoutLogin } = useSelector(state => state.appInfo)

	const { setShowLayoutLogin } = useActions(appInfoActions)
	const { setMemberInfo } = useActions(memberInfoActions)

	const [isLogining, setLogining] = useState<boolean>(false)

	// 关闭浮动弹层
	const handleLayoutLoginClose = () => {
		setShowLayoutLogin(false)
	}

	const handleGetUserInfo = async e => {
		// console.log('handleGetUserInfo', e)
		const objUserInfo = e.detail.userInfo
		if (objUserInfo && !checkObjectEmpty(objUserInfo)) {
			setLogining(true)
			objUserInfo.share_sourceID = shareInfo.sourceID
			objUserInfo.share_shareType = shareInfo.shareType
			objUserInfo.share_sharePath = shareInfo.sharePath
			const res = await api.cloud.fetchMemberInfo.addMember(objUserInfo)
			// console.log('handleGetUserInfo addMemberInfo', res)
			setMemberInfo(res)
			setLogining(false)
			setShowLayoutLogin(false)
			Taro.showToast({
				title: '登录成功',
				icon: 'success',
			})
		}
	}

	return (
		<AtFloatLayout
			isOpened={isShowLayoutLogin}
			onClose={handleLayoutLoginClose}
		>
			<AtButton
				className='layout-login-btn'
				openType='getUserInfo'
				type='primary'
				circle
				loading={isLogining}
				onGetUserInfo={handleGetUserInfo}
			>
				微信快捷登录
			</AtButton>
		</AtFloatLayout>
	)
}
