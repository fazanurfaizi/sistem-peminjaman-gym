import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default defineNuxtPlugin((app) => {
    app.vueApp.component('DatePicker', VueDatePicker)
})