export default renderTable = (data,jsonArr) => {
    const isArray = a => {
        return Object.prototype.toString.call(a).slice(8, -1) === "Array";
    }
    const isObject = a => {
        return Object.prototype.toString.call(a).slice(8, -1) === "Object";
    }
    const getType = a => {
        return Object.prototype.toString.call(a).slice(8, -1)
    }
    if(!isObject(data)) {
        console.warn(`error，data must is Object，It cannot be ${getType(data)}`)
        return false;
    }
    if(!isArray(jsonArr)) {
        console.warn(`error，template data must is Array，It cannot be ${getType(jsonArr)}`)
        return false;
    }
    
    const recursiveRender = (data,jsonArr) => {
        for(let i of jsonArr) {
            i.params = data[i.params]
            if(isArray(i.children)) {
                recursiveRender(data,i.children)
            }
        }
    }
    return jsonArr
}