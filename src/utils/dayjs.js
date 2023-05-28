import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 配置使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// dayjs 默认语言为英文, 配置为中文
// 全局使用
dayjs.locale('zh-cn')
// 定义一个全局过滤器,在任何组件的模版使用,相当于一个全局可用的方法(仅供模版使用)
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
