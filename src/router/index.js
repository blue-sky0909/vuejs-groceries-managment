import Vue from 'vue'
import Router from 'vue-router'
import GroceriesList from '@/components/GroceriesList'
import NewGrocery from '@/components/NewGrocery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: GroceriesList
    },
    {
      path: '/create',
      name: 'create',
      component: NewGrocery
    }
  ]
})
