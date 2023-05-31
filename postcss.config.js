/**
 * PostCSS 配置文件
*/
module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用: 生成浏览器 CSS 样式规则前缀
    // autoprefixer: {
    //   // autoprefixer 插件的配置
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 配置使用 postcss-pxtorem 插件
      // 作用: 把 px 转为 rem
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,
      // 配置要转换的 CSS 属性
      // * 表示所有
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'

    }
  }
}
