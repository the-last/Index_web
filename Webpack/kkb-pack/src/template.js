!function(modules){
    // 缓存
    const installModules = {};
    
    function __kkbpack_require__(moduleId) {
        // 判断是否有缓存
        if (installModules[moduleId]) {
            return installModules[moduleId].exports;
        }
        let modules = installModules[moduleId] = {
            exports: {}
        }
        modules[moduleId].call(modules.exports, module, exports, __kkbpack_require__)
        return module.exports
    }
    return __kkbpack_require__("__entry__")

}(__modules_content__)