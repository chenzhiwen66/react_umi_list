import React, { useEffect } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import style from './index.less'
import { connect } from 'dva';

let time = null
const Search = (props) => {

  // 输入框改变 防抖
  const searchHandle = (e) => {
    clearTimeout(time)
    time = setTimeout(() => {
      const filterArr = props.applist.downloadList.filter((item) => {
        return item['im:name'].label.includes(e.target.value) || 
        item['im:artist'].label.includes(e.target.value) || 
        item.summary.label.includes(e.target.value)
      })

      props.dispatch({
        type: 'applist/getDownloadFilter',
        payload: filterArr
      })


    }, 1000)
  }

  return (
    <div className={style.search_box}>
      <Input
        placeholder='Search...'
        onChange={searchHandle}
        className={style.search_input}
        prefix={<SearchOutlined />} ></Input>
    </div>
  )
}
export default connect((applist) => { return applist })(Search)
