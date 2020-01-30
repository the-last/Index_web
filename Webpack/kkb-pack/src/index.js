#! /usr/bin/env node
const path = require('path');
const fs   = require('fs');

// 默认配置（webpack能支持零配置，是因为本身有默认配置）
const defaultConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    }
}

const config = {...defaultConfig, ...require(path.resolve('./kkb.config.js'))}

class Kkbpack {
    constructor (config) {
        // 存储配置
        this.config = config;
        this.entry = config.entry;
        // 工作根目录
        this.root = process.cwd();

        // 存储所有代码
        this.modules = {}
    }

    // 解析文件
    parse(code, parent) {
        let deps = []
        // 能够解析文件内容中的require('xx.js')
        let r = /require\('(.*)'\)/g;
        // require('xx') 替换为 __kkbpack_require__
        code = code.replace(r, function (match, args) {
            // 依赖路径
            const resultPath = path.join(parent, args.replace(/'|"/g, ''));
            deps.push(resultPath);
            return `__kkbpack_require__("./${resultPath}")`;
        });

        return {code, deps}
    }


    // 递归解析文件依赖，递归的调用 createModule
    createModule(modulePath, name) {
        const fileContent =  fs.readFileSync(modulePath, 'utf-8');
        // 代码和替换后的代码，替换后的代码和依赖数组
        let { code, deps } = this.parse(fileContent, path.dirname(name))
        console.log(code, deps)
        code = code.replace(/\n/g, '');
        this.modules[name] = `function(module, exports, __kkbpack_require__){
            eval(\'${code}\')
        }`

        // 循环获取所有依赖数组的内容
        deps.forEach(dep => {
            this.createModule(path.join(this.root, dep), './' + dep);
        })
    }

    generateModuleStr () {
        let fnTemp = "{"
        Object.keys(this.modules).forEach(name => {
            fnTemp += `\n"${name}": (${this.modules[name]}),`
        })
        return fnTemp + "}"
    }

    generateFile() {
        let fileContent = fs.readFileSync(path.resolve(__dirname, './template.js'), 'utf-8');
        this.template = fileContent.replace('__entry__', this.entry)
                                 .replace('__modules_content__', this.generateModuleStr())

        fs.writeFileSync('./dist/' + this.config.output.filename, this.template)
        console.log('写入文件完毕')
    }

    start() {

        // 完整的文件路径
        console.log('开始解析文件的依赖')
        const entryPath = path.resolve(this.root, this.entry)
        this.createModule(entryPath, this.entry);
        console.log(this.modules)
        // this modules 再生成新文件
        this.generateFile()
    }
}

const kkb = new Kkbpack(config);

kkb.start(); //  先搭一个简单的架子
