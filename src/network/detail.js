import { request } from "./request";

/**
 * 根据iid请求商品详情信息
 * @param iid
 * @returns {*}
 */
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}