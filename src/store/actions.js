export default {
    addList(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                context.commit('addCount', oldProduct)
                resolve('商品已存在！数量加1')
            } else {
                payload.count = 1
                context.commit('addToCart', payload)
                resolve('✔添加购物车成功！')
            }
        })

    }
}