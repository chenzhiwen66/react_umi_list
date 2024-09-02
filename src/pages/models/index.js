import { getPopularList, getFreeAppList,getFreeAppDetails } from '@/pages/api/index.js'
export default {
    namespace: 'applist',
    state: {
        popularList: [], // 热门数组
        downloadList: [], // 免费下载数组
        scoreArr:[], // 评分数组
        filterArr:[], // 搜索过滤数组
    },
    // 异步actions
    effects: {
        *getPopularList({ payload }, { call, put }) {
            const { data } = yield call(getPopularList)
            yield put({
                type: 'setData',
                payload: {
                    popularList: data.feed.entry
                }
            })
        },
        *getDownloadList({ payload }, { call, put }) {
            const { data } = yield call(getFreeAppList)
            yield put({
                type:'setData',
                payload:{
                    downloadList:data.feed.entry,
                    filterArr:data.feed.entry,
                }
            })
        },
        *getDownloadFilter({ payload }, { call, put }) {
            yield put({
                type:'setData',
                payload:{
                    filterArr:payload
                }
            })
        },

        *getDownloadDetail({ payload }, { call, put }) {
            const { data } = yield call(getFreeAppDetails, payload.ids)
            const scoreArr = data.results.map(item=>{
                return{
                    trackId:item.trackId,
                    averageUserRating:item.averageUserRating,
                    userRatingCount:item.userRatingCount,
                }
            })

            yield put({
                type:'setData',
                payload:{
                    scoreArr:scoreArr
                }
            })
        }
    },
    // 同步action 用来修改state
    reducers: {
        setData(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },

    }
}