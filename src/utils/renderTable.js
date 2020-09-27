const renderTable = (data,jsonArr) => {
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
    const addTag = e => {
        if(!e) {
            return 'text';
        }
        return e.split('-')[1];
    }

    /**
     * data 原始数据
     * jsonArr 需要融合的数据
    */
    // const findSameKey = (data,jsonArr) => {
    //     for(let i of jsonArr) {
    //         if(data[i.params] && data[i.params] === jsonArr[i.params]) {
                
    //         }
    //     }
    // }

    const recursiveRender = (data,jsonArr) => {
        for(let i of jsonArr) {
            i.titleDataType = addTag(i.params)
            i.subDataType = addTag(i.subParams)
            i.params = data[i.params]
            i.subParams = data[i.subParams]
            
            if(isArray(i.children)) {
                recursiveRender(data,i.children)
            }
        }
    }
    recursiveRender(data,jsonArr)
}

export default renderTable