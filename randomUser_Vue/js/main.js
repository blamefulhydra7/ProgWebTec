const App = {
    data: function () {
        return {
            mensaje: 'Hola VueJS',
            muestra: true,
            nombre: '',
            personas: [],
            cantidad: 1,
        }
    },
    methods: {
        cambiarMuestra: function () {
            this.muestra = !this.muestra;
        },
        randomUser: async function() {
            const response = await axios.get(`https://randomuser.me/api/?results=${this.cantidad}`);
            const nombre = response.data.results[0].name.first;
            const personas = response.data.results;

            this.personas = personas;
            this.nombre = nombre;
        }
    }
};

Vue.createApp(App).mount("#app");