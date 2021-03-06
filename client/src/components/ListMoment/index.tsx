import React from 'react'
import { View } from '@tarojs/components'

import Base from './components/Base'
import Moments from './components/Moments'

import './index.less'

export interface IItemType {
	_id?: string
	author?: string // 作者
	title?: string // 标题
	logo?: string // 头像
	posterImg?: string // 缩略图
	createTime?: string // 创建时间
	address?: string // 地理位置
	source?: string // 源类型
	images?: Array<string> // 缩略图
}

interface IListMomentProps {
	isLoadCompleteList?: boolean // 是否列表加载完毕
	strType:
		| 'MOMENTS' // 朋友圈类型
		| 'BASE'
	arrList: Array<IItemType>
	showBottomLoadingTip?: boolean
	onDetailClick: (any: any) => void
}

export default function ListMoment(props: IListMomentProps) {
	const {
		isLoadCompleteList = true,
		strType = '',
		showBottomLoadingTip = false,
		arrList = [],
		onDetailClick,
	} = props

	const readerList = () => {
		switch (strType) {
			case 'MOMENTS':
				return (
					<Moments
						isLoadCompleteList={isLoadCompleteList}
						arrList={arrList}
						onDetailClick={onDetailClick}
					/>
				)
			case 'BASE':
				return (
					<Base
						isLoadCompleteList={isLoadCompleteList}
						arrList={arrList}
						onDetailClick={onDetailClick}
					/>
				)
			default:
				return <View></View>
		}
	}

	return (
		<View className='list-moment-wrap'>
			{readerList()}
			{showBottomLoadingTip && (
				<View className='list-moment-loading-tip'>努力加载中...</View>
			)}
		</View>
	)
}
