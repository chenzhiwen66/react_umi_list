import request from '@/untils/request'

// 获取推薦App列表 api
const getPopularList = () => {
    return request({
        url: 'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json',
        methods: 'get',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },

    })
}

// 获取下載量最多的免費App列表
const getFreeAppList = () => {
    return request({
        url: 'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json',
        methods: 'get',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
}

// 获取下載量最多的免費App詳細資訊
const getFreeAppDetails = (ids) => {
    return request({
        url: `https://itunes.apple.com/hk/lookup?id=${ids}`,
        methods: 'get',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
}


export { getPopularList, getFreeAppList,getFreeAppDetails }