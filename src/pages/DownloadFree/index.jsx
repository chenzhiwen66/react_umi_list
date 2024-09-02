import React, { useEffect, useState, useRef } from 'react'
import style from './index.less'
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'dva';
import { List, Avatar, Divider, Rate } from 'antd';

let downloadArr = []
let downloadCurrent = 1

const DownloadFree = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    downloadList()
  }, [])

  useEffect(() => {
    if (props.applist.downloadList.length === 0) {
      return
    }
    const ids = getIds().join(',')
    getdownloadDetail(ids)
  }, [props.applist.downloadList])

  useEffect(() => {
    downloadArr = props.applist.filterArr
    if (downloadArr.length === 0) {
      return
    }
    setData(downloadArr.slice(0, 20))

    downloadCurrent = 1
    return (() => {
      downloadCurrent = 1
    })
  }, [props.applist.filterArr])



  // 获取下载最多的app列表
  const downloadList = (() => {
    props.dispatch({
      type: 'applist/getDownloadList'
    })
  })

  // 获取ids
  const getIds = (() => {
    return props.applist.downloadList?.map((item) => {
      return item.id.attributes['im:id']
    })
  })

  // 获取app的评分列表
  const getdownloadDetail = (ids) => {
    props.dispatch({
      type: 'applist/getDownloadDetail',
      payload: {
        ids
      }
    })
  }

  // 懒加载 data的数据
  const downFilterList = () => {
    let splitArr = downloadArr.slice(20 * downloadCurrent, 20 * (downloadCurrent + 1))
    downloadCurrent++
    setData([...data, ...splitArr]);
  }

  // 评分组件
  const SourceItem = (item) => {
    if (props.applist.scoreArr.length < 1) {
      return
    }

    const score = props.applist.scoreArr.find((i) => {
      return i.trackId == item.id.attributes['im:id']
    })

    return (
      <div className={style.scoure} key={score.trackId + '_source'}>
        <Rate disabled defaultValue={score.averageUserRating} />
        ({score.userRatingCount})
      </div>
    )
  }

  return (
    <div className={style.download_box} id='downloadList'>
      <InfiniteScroll
        dataLength={data.length}
        next={downFilterList}
        hasMore={data.length < props.applist.filterArr.length}
        loader={<h4>正在加载，请稍等...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>已全部加载完成</b>
          </p>
        }
        scrollableTarget="downloadList"
      >
        {
          data.map((item, index) => {
            return (
              <div className={style.item_connect} key={item.id.attributes['im:id']}>
                <div className={style.item_number}>{index + 1}</div>
                <Avatar
                  style={{ width: 75, height: 75 }}
                  src={item['im:image'][1].label} shape={index % 2 ? 'circle' : 'square'} />
                <div className={style.item_detail}>
                  <div className={style.title}>{item['im:name'].label}</div>
                  {/* <div className={style.title}>{item.id.attributes['im:id']}</div> */}
                  <div className={style.type}>{item['im:contentType'].attributes?.label}</div>

                  {SourceItem(item)}

                </div>
              </div>
            )
          })
        }
      </InfiniteScroll>

    </div>
  )
}
export default connect((applist) => { return applist })(DownloadFree)