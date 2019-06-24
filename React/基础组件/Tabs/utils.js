function classesname (obj) {
    let classStr = ''
    Object.keys(obj).forEach(v => {
        if (obj[v]) {
            classStr += ` ${v}`
        }
    })

    return classStr
}
export {
    classesname
}