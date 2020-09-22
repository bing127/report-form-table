import BasicContainer from './src/components/basic-container/main'
import AttrView from './src/components/DesignAttribute/attrView'
import TableView from './src/components/DesignAttribute/tableView'
import Design from './src/components/Design'
import DesignTable from './src/components/DesignTable'
import GeneratorTable from './src/components/GeneratorTable'
import Preview from './src/components/preview'
import BusEvent from './src/utils/bus'
import RenderTable from './src/utils/renderTable'
import Print from './src/utils/print'
import UrlParams from './src/utils/urlParams'

const components = [
    BasicContainer,
    AttrView,
    TableView,
    Design,
    DesignTable,
    GeneratorTable,
    Preview
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });

    Vue.prototype.$renderTable = RenderTable;
    Vue.prototype.$busEvent = BusEvent;
    Vue.prototype.$print = Print;
    Vue.prototype.$urlParams = UrlParams;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    BasicContainer,
    AttrView,
    TableView,
    Design,
    DesignTable,
    GeneratorTable,
    Preview
}