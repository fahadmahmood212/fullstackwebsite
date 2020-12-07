import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../pages/main_page/MainPage.vue' //this import from the main page 
import Cart from '../pages/cart/Cart.vue' //this import the car page

//this is for adding vue router library to the project
Vue.use(VueRouter)

//this is defining the different pages and their locations
const routes = [
  { 
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component:Cart
  }
]
//creating instance of vue router
const router = new VueRouter({
  routes
})
export default router
