export const state = () => ({
  orders: [],
  subscribers: [],
});

export const mutations = {
  setSizes(state, sizes){
    state.sizes = sizes;
  },
  setSize(state, size){
    state.size = size;
  },
  setOrders(state, orders){
    state.orders = orders;
  },
  setSubscribers(state, subscribers){
    state.subscribers = subscribers;
  }
}

export const actions = {
  async checkPassword({commit}, [id, password]) {
    const sizes = await this.$axios.$post('http://127.0.0.1:8000/api/user/checkPassword', {id: id, password: password});
  },
  async update(ctx, [id, name, email, password, phone, address]){
    await this.$axios.$post('http://127.0.0.1:8000/api/user/update', {id, name, email, password, phone, address});
  },
  async updatePassword(ctx, [id, old_password, new_password]){
    await this.$axios.$post('http://127.0.0.1:8000/api/user/updatePassword', {id, old_password, new_password});
  },
  async resetPassword(ctx, [email, new_password]){
    await this.$axios.$post('http://127.0.0.1:8000/api/user/resetPassword', {email, new_password});
  },
  async updateAddress(ctx, [id, address]){
    await this.$axios.$post('http://127.0.0.1:8000/api/user/updateAddress', {id, address});
  },
  async updateImage(ctx, [id, image]){
    await this.$axios.$post('http://127.0.0.1:8000/api/user/updateImage', {id, image});
  },
  async updateNotification(ctx, [id, notification]){
    await this.$axios.$post('http://127.0.0.1:8000/api/user/updateNotification', {id, notification});
  },
  async buy(ctx, [user_id, cartId, totalPrice, address, payment, nameLastName, email, count, phone, country, apartment, city, selected_region, zip, more_info, delivery_type]){
    let cookieRes = this.$cookies.remove('davmar_cart');

    // await this.$axios.$post('http://127.0.0.1:8000/api/order/store', {user_id, cartId, totalPrice, address, payment, nameLastName, email, count, phone});
    // return true;

    let result = await this.$axios.$post('http://127.0.0.1:8000/api/order/store', {user_id, cartId, totalPrice, address, payment, nameLastName, email, count, phone, country, apartment, city, selected_region, zip, more_info, delivery_type});
    return result;
  },
  async initOrder(ctx, [description, orderId, amount]){
    let result = await this.$axios.$post('http://127.0.0.1:8000/api/payment/InitPayment', {description, orderId, amount});
    return result;
  },
  async getPayment(ctx, [paymentID, orderID]){
    let result = await this.$axios.$post('http://127.0.0.1:8000/api/payment/GetPaymentDetails', {paymentID, orderID});
    return result;
  },
  async refundPayment(ctx, [order_id]){
    let result = await this.$axios.$post('http://127.0.0.1:8000/api/payment/RefundPayment', {order_id});
    return result;
  },
  async subscribe(ctx, [email, phone]){
    let result = await this.$axios.$post('http://127.0.0.1:8000/api/subscribe/subscribe', {email, phone});
    return result;
  },
  async getSubscribers({commit}){
    let result = await this.$axios.$get('http://127.0.0.1:8000/api/subscribe/get');
    commit('setSubscribers', result);
  },
  async getOrders({commit}, [userId]){
    if(userId == 'All'){
      let orders = await this.$axios.$get('http://127.0.0.1:8000/api/order/get/');
      commit('setOrders', orders);

    }else{
      let orders = await this.$axios.$get('http://127.0.0.1:8000/api/order/get/'+userId);
      commit('setOrders', orders);

    }
  }
}

export const getters = {
  sizes: s => s.sizes,
  size:  s => s.size,
  subscribers:  s => s.subscribers,
  orders:  s => s.orders
}
