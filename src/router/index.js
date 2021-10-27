import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

import UserManage from '../components/system/UserManage.vue'
import RoleManage from '../components/system/RoleManage.vue'
import AuthManage from '../components/system/AuthManage.vue'
import DeptManage from '../components/system/DeptManage.vue'

//product
import AcquireProduct from '../components/product/acquireProduct.vue'
import Audit from '../components/product/audit.vue'
import GoodsType from '../components/product/goodstype.vue'
import PriceAudit from '../components/product/priceAudit.vue'
import Supplier from '../components/product/supplier.vue'
import BrandManage from '../components/product/brandManage.vue'
import ProductManage from '../components/product/productManage.vue'
import GoodsSearch from '../components/product/goodsSearch.vue'

// gift
import GiftManage from '../components/gift/GiftManage.vue'
import GiftToProductManage from '../components/gift/GiftToProductManage.vue'
import GiftToProductAudit from '../components/gift/GiftToProductAudit.vue'
import ProductToGiftManage from '../components/gift/ProductToGiftManage.vue'
import ProductToGiftAudit from '../components/gift/ProductToGiftAudit.vue'

//销售订单
import SaleOrder from '../components/saleOrder/SaleOrder.vue'
import WaitToOutStorage from '../components/saleOrder/WaitToOutStorage.vue'

//日志
import LogInfo from '../components/logInfo/showLog.vue'

import ReturnAndRepair from '../components/AfterSaleManage/B2CReturnAndRepair.vue'

//返厂入库
import ReFacInAudit from '../components/returnFactory/ReFacInAudit.vue'
import ReFacInManage from '../components/returnFactory/ReFacInManage.vue'
import ReFacOutAudit from '../components/returnFactory/ReFacOutAudit.vue'
import ReFacOutManage from '../components/returnFactory/ReFacOutManage.vue'


Vue.use(Router)

export default new Router({
  mode:'hash',
  base: '/dist',
  routes: [{
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        keepalive: true
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        keepalive: true
      },
      children: [
        // 如果加了斜杠，代表以根目录开始请求
        {
          path: 'userManage',
          component: UserManage
        },
        {
          path: 'roleManage',
          component: RoleManage
        },
        {
          path: 'authManage',
          component: AuthManage
        },
        {
          path: 'deptManage',
          component: DeptManage
        },
        {
          path: 'acquireProudct',
          component: AcquireProduct
        },
        {
          path: 'goodsType',
          component: GoodsType
        },
        {
          path: 'audit',
          component: Audit
        },
        {
          path: 'priceAudit',
          component: PriceAudit
        },
        {
          path: 'supplier',
          component: Supplier
        },
        {
          path: 'returnAndRepair',
          component: ReturnAndRepair
        },
        {
          path: 'brandManage',
          component: BrandManage
        },
        {
          path: 'productManage',
          component: ProductManage
        },
        {
          path: 'goodsSearch',
          component: GoodsSearch
        },
        {
          path: 'giftManage',
          component: GiftManage
        },
        {
          path: 'giftToProductManage',
          component: GiftToProductManage
        },
        {
          path: 'giftToProductAudit',
          component: GiftToProductAudit

        },
        {
          path: 'productToGiftManage',
          component: ProductToGiftManage
        },
        {
          path: 'productToGiftAudit',
          component: ProductToGiftAudit
        },
        {
          path: 'saleOrder',
          component: SaleOrder
        },
        {
          path: 'waitToOutStorage',
          component: WaitToOutStorage
        },
        {
          path: 'logInfo',
          component: LogInfo
        },
        {
          path: 'reFacInAudit',
          component: ReFacInAudit
        },
        {
          path: 'reFacInManage',
          component: ReFacInManage
        },
        {
          path: 'reFacOutAudit',
          component: ReFacOutAudit
        },
        {
          path: 'reFacOutManage',
          component:  ReFacOutManage
        },
      ]
    }
  ]
})


 