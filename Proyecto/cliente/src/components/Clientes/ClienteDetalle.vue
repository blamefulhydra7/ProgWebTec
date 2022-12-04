<template>
    <div class="ProveedorDetalle">
        <b-icon-caret-right-fill/> No. {{ cliente.id }}
        <br>  
        <b-icon-caret-right-fill/> Nombre: {{ cliente.nombre }}
        <br>
        <b-icon-caret-right-fill/> Dirección: {{ cliente.direccion }}
        <br>
        <b-icon-caret-right-fill/> RFC: {{ cliente.rfc }}
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '@/utils/constantes';

export default {
    name: 'clienteDetalle',
    components: {},
    props: {
        id: Number,
    },
    data: function () {
        return {
            cliente: {},
        };
    },
    created() {
        this.getCliente(this.id)
    },
    methods: {
        getCliente: async function (id) {
            try {
                const { data } = await axios.get(URL_API + `/clientes/${id}`);
                this.cliente = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer al cliente UnU', 'error');
                console.log(error);
            }
        }
    },
}
</script>