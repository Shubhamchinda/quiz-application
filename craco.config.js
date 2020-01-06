const CracoAntDesignPlugin = require('craco-antd')
const slash = require('slash2')

module.exports = {
  babel: {
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          // https://babeljs.io/blog/2018/09/17/decorators
          // https://github.com/mobxjs/mobx/issues/1352
          legacy: true
        }
      ]
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: { '@primary-color': '#00bfff' },
          // strictMath: true,
          // noIeCompat: true,
          javascriptEnabled: true
        },
        cssLoaderOptions: {
          modules: true,
          // localIdentName: '[local]',
          getLocalIdent: (context, localIdentName, localName) => {
            if (
              context.resourcePath.includes('node_modules') ||
              context.resourcePath.includes('ant.design.pro.less') ||
              context.resourcePath.includes('global.less')
            ) {
              return localName
            }
            const match = context.resourcePath.match(/src(.*)/)
            if (match && match[1]) {
              const antdProPath = match[1].replace('.less', '')
              const arr = slash(antdProPath)
                .split('/')
                .map(a => a.replace(/([A-Z])/g, '-$1'))
                .map(a => a.toLowerCase())
              return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-')
            }
            return localName
          }
        }
      }
    }
  ]
}