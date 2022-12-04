<template>
    <div class="VentaDetalle">
        <b-icon-caret-right-fill/> No. {{ venta.id }}
        <br>  
        <b-icon-caret-right-fill/> Articulo: {{ venta.descripcion }}
        <br>
        <b-icon-caret-right-fill/> Precio: {{ venta.precio }}
        <br>
        <b-icon-caret-right-fill/> Cantidad: {{ venta.cantidad }}
        <br>
        <b-icon-caret-right-fill/> Cliente: {{ venta.nombre }}
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '@/utils/constantes';

export default {
    name: 'ventaDetalle',
    components: {},
    props: {
        id: Number,
    },
    data: function () {
        return {
            venta: {},
        };
    },
    created() {
        this.getVenta(this.id)
    },
    methods: {
        getVenta: async function (id) {
            try {
                const { data } = await axios.get(URL_API + `/ventas/${id}`);
                this.venta = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer la venta UnU', 'error');
                console.log(error);
            }
        }
    },
}
</script>