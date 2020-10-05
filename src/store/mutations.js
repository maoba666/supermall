import Vue from 'vue'
export default {
    addCount(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    },
    /**
     * 删除选中的商品
     */
    deleteProduct(state) {
        state.cartList = state.cartList.filter(item => !item.checked);
    },
    updateCounts(state, payload) {
        //1、查找到当前要修改的商品
        let oldProduct = state.cartList.find(item => {
                return item.iid === payload.item.iid
            })
            //2、改变checked值
        oldProduct.count += payload.number;
    },

}