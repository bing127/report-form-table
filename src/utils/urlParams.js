const getUrlParams = e => {
    let svalue = location.search.match(new RegExp("[\?\&]" + e + "=([^\&]*)(\&?)","i"));
    return svalue ? svalue[1] : svalue 
}

export default getUrlParams