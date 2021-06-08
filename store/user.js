export const state = () => ({
  orders: [],
  subscribers: [],
  callbacks: [],
  questionnairies: []
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
  },
  setCallbacks(state, callbacks){
    state.callbacks = callbacks;
  },
  setQuestionnairies(state, questionnairies){
    state.questionnairies = questionnairies;
  }
}

export const actions = {
  async checkPassword({commit}, [id, password]) {
    const sizes = await this.$axios.$post(this.$axios.defaults.baseURL+'/user/checkPassword', {id: id, password: password});
  },
  async update(ctx, [id, name, email, password, phone, address]){
    await this.$axios.$post(this.$axios.defaults.baseURL+'/user/update', {id, name, email, password, phone, address});
  },
  async updatePassword(ctx, [id, old_password, new_password]){
    await this.$axios.$post(this.$axios.defaults.baseURL+'/user/updatePassword', {id, old_password, new_password});
  },
  async resetPassword(ctx, [email, new_password]){
    await this.$axios.$post(this.$axios.defaults.baseURL+'/user/resetPassword', {email, new_password});
  },
  async updateAddress(ctx, [id, address]){
    await this.$axios.$post(this.$axios.defaults.baseURL+'/user/updateAddress', {id, address});
  },
  async updateImage(ctx, [id, image]){
    await this.$axios.$post(this.$axios.defaults.baseURL+'/user/updateImage', {id, image});
  },
  async updateNotification(ctx, [id, notification]){
    await this.$axios.$post(this.$axios.defaults.baseURL+'/user/updateNotification', {id, notification});
  },
  async buy(ctx, [user_id, cartId, productId, totalPrice, address, payment, nameLastName, email, count, phone, country, apartment, city, selected_region, zip, more_info, delivery_type]){
    let cookieRes = this.$cookies.remove('davmar_cart');

    // await this.$axios.$post(this.$axios.defaults.baseURL+'/order/store', {user_id, cartId, totalPrice, address, payment, nameLastName, email, count, phone});
    // return true;

    let result = await this.$axios.$post(this.$axios.defaults.baseURL+'/order/store', {user_id, cartId, productId, totalPrice, address, payment, nameLastName, email, count, phone, country, apartment, city, selected_region, zip, more_info, delivery_type});
    return result;
  },
  async initOrder(ctx, [description, orderId, amount]){
    let result = await this.$axios.$post(this.$axios.defaults.baseURL+'/payment/InitPayment', {description, orderId, amount});
    return result;
  },
  async getPayment(ctx, [paymentID, orderID]){
    let result = await this.$axios.$post(this.$axios.defaults.baseURL+'/payment/GetPaymentDetails', {paymentID, orderID});
    return result;
  },
  async refundPayment(ctx, [order_id]){
    let result = await this.$axios.$post(this.$axios.defaults.baseURL+'/payment/RefundPayment', {order_id});
    return result;
  },
  async subscribe(ctx, [email, phone]){
    let result = await this.$axios.$post(this.$axios.defaults.baseURL+'/subscribe/subscribe', {email, phone});
    return result;
  },
  async getSubscribers({commit}){
    let result = await this.$axios.$get(this.$axios.defaults.baseURL+'/subscribe/get');
    commit('setSubscribers', result);
  },
  async getCallbacks({commit}){
    let result = await this.$axios.$get(this.$axios.defaults.baseURL+'/callback/get');
    commit('setCallbacks', result);
  },
  async getQuestionnairies({commit}){
    let result = await this.$axios.$get(this.$axios.defaults.baseURL+'/questionnaire/get');
    commit('setQuestionnairies', result);
  },
  async getOrders({commit}, [userId]){
    if(userId == 'All'){
      let orders = await this.$axios.$get(this.$axios.defaults.baseURL+'/order/get/');
      commit('setOrders', orders);

    }else{
      let orders = await this.$axios.$get(this.$axios.defaults.baseURL+'/order/get/'+userId);
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
