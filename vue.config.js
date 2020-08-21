const path = require('path');
module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    devServer: {
		proxy: {
			'/devApi': {
				target: 'http://www.web-jshtml.cn/productapi',
				changeOrigin: true,
				pathRewrite: {
					'^/devApi': ''
				}
			}
		}
	}
};