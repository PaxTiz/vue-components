import FormBuilder from './components/FormBuilder.vue'

const Plugin = {
    install (Vue) {
        Vue.component('FormBuilder', FormBuilder)
    }
}

export default Plugin
