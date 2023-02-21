import config from './base.config'
import {merge} from 'webpack-merge'

import { Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const devconfig:Configuration = {
    devServer:{
        host: 'localhost',
        port: '1314',
        hot:true,
        static: {
            publicPath: '/',
        },
        open:true,
    },
}

export default merge(config,devconfig)
