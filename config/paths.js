'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
console.log(`当前appDirectory地址🥒🥒🥒🥒${appDirectory}`);
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
    process.env.NODE_ENV === 'development',
    require(resolveApp('package.json')).homepage,
    process.env.PUBLIC_URL
);

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );
    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }
    return resolveFn(`${filePath}.js`);
};

/**
 * ⬇️⬇️⬇️⬇️新增多页打包配置
 * **/
const glob = require('glob');

// 获取指定路径下的入口文件
function getEntries(globPath){
    const files = glob.sync(globPath);
    const entries = {};
    files.forEach(function (filepath){
        const split = filepath.split('src/pages/');
        const name = split[1];
        const nameIndex = name.lastIndexOf('/');
        //  key 是 a/b/c 的路由结构
        const key = name.slice(0, nameIndex);
        entries[key] = './' + filepath;
    });
//    console.log(entries);
//    console.log('🍌🍌');
    return entries;
}

const entries = getEntries('src/pages/**/index.jsx');

function getIndexJs(){
    const indexJsList = [];
    Object.keys(entries).forEach((name) => {
        const indexjs = resolveModule(resolveApp, `src/pages/${name}/index`);
        indexJsList.push({
            name,
            path: indexjs
        });
    });
//    console.log(indexJsList);
//    console.log('入口文件🌰🌰');
    return indexJsList;
}

const appIndexJs = getIndexJs();
/**
 * ⬆️⬆️⬆️⬆️新增多页打包配置
 * **/



// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    //  入口文件
    appIndexJs,
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('./jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('config/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    publicUrlOrPath,
    entries,

    /**
     * 以下，自定义的，给别名用的所以加了__
     * ***/
    //  api
    __api: resolveApp('src/api'),
    //  组件
    __components: resolveApp('src/components'),
    //  页面
    __pages: resolveApp('src/pages'),
    //  css
    __css: resolveApp('src/css'),
    //  媒体
    __media: resolveApp('src/media'),
    //  工具
    __utils: resolveApp('src/utils'),
    //  store
    __store: resolveApp('src/store'),
};

//  resolveModule(resolveApp, 'src/index')

module.exports.moduleFileExtensions = moduleFileExtensions;
