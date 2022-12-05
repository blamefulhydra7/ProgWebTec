<template>
    <div class="ProveedorDetalle">
        <fieldset>
            <legend>Detalle de proveedor</legend>
            <b-icon-caret-right-fill/> No. {{ proveedor.id }}
            <br>  
            <b-icon-caret-right-fill/> Nombre: {{ proveedor.nombre }}
            <br>
            <b-icon-caret-right-fill/> RFC: {{ proveedor.rfc }}
            <br>
            <b-icon-caret-right-fill/> Dirección: {{ proveedor.direccion }}
            <br>
            <b-icon-caret-right-fill/> Teléfono: {{ proveedor.telefono }}
            <br>
            <b-icon-caret-right-fill/> Observaciones: {{ proveedor.observaciones }}
        </fieldset>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_API } from '@/utils/constantes';
import Swal from 'sweetalert2';

export default {
    name: 'proveedorDetalle',
    components: {},
    props: {
        id: Number,
    },
    data: function () {
        return {
            proveedor: {},
        };
    },
    created() {
        this.getProveedor(this.id)
    },
    methods: {
        getProveedor: async function (id) {
            try {
                const { data } = await axios.get(URL_API + `/proveedores/${id}`);
                this.proveedor = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer al proveedor UnU', 'error');
                console.log(error);
            }
        }
    },
}
</script>