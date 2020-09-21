import BasicContainer from './src/components/basic-container/main'
import AttrView from './src/components/DesignAttribute/attrView'
import TableView from './src/components/DesignAttribute/tableView'
import Design from './src/components/Design'
import DesignTable from './src/components/DesignTable'
import GeneratorTable from './src/components/GeneratorTable'
import Preview from './src/components/preview'

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