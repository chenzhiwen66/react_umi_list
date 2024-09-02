import React, { useEffect, useState } from 'react'
import style from './index.less'
import { Image } from "antd";
import { connect } from 'umi';
import EmptyImg from '@/assets/empty_img.png'
const Recommend = (props) => {
  const { popularList } = props.applist
  const [popularArr, setPopularArr] = useState([])

  useEffect(() => {
    props.dispatch({
      type: 'applist/getPopularList'
    })
  }, [])

  useEffect(() => {
    setPopularArr(popularList)
  }, [popularList])

  return (
    <div className={style.recommend_box}>
      <div className={style.title}>Recommend</div>
      <div className={style.recommend_list}>
        <div className={style.recommend_content}>
          {popularArr.map((item) => {
            return (
              <div key={item.id.attributes['im:id']} className={style.recommend_item}>
                <div className={style.recommend_item_img}>
                  <Image
                    width={90}
                    height={90}
                    preview='false'
                    fallback={EmptyImg}
                    style={{ borderRadius: '15px' }}
                    src={item['im:image'][2]['label']}
                  ></Image>
                </div>
                <div className={style.recommend_item_name}>{item['im:name'].label ?? '-'}</div>
                <div className={style.recommend_item_type}>{item['im:contentType'].attributes.label ?? '-'}</div>

              </div>
            )
          })}
        </div>


      </div>
    </div>
  )
}
export default connect((applist) => { return applist })(Recommend)