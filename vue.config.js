module.exports = {
    publicPath: './',  // 打包路径
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    productionSourceMap: process.env.NODE_ENV === 'development', // 生产环境是否生成 sourceMap 文件
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // Gzip压缩
            const CompressionWebpackPlugin = require('compression-webpack-plugin')
            config.plugins.push(new CompressionWebpackPlugin({
                test: /\.js$|\.html$|\.css/,  // 需要压缩的文件类型
                threshold: 10240,  // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
                deleteOriginalAssets: true  // 是否删除原文件
            }));

            // 配置 terserOptions 去除console
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ["console.log"]
            // 配置拆包
            config.optimization.splitChunks.cacheGroups.vendors = {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    return `chunk.${packageName.replace('@', '')}`;
                },
                reuseExistingChunk: true,
                enforce: true,
                minSize: 20000,
                // maxSize: 244000,
                priority: -10,
                chunks: 'initial'
            }
        }

        if (process.env.IS_ANALYZ) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            // 配置 打包分析
            config.plugins.push(new BundleAnalyzerPlugin());
        }
    },
}