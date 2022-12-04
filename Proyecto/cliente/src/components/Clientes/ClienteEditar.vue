<template>
    <div class="ProveedorEditar text-start">
        <form @submit.prevent="actualizar(id)">
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" class="form-control" id="nombre" v-model="cliente.nombre">
            </div>
            <div class="mb-3">
                <label for="direccion" class="form-label">Dirección:</label>
                <input type="text" class="form-control" id="direccion" v-model="cliente.direccion">
            </div>
            <div class="mb-3">
                <label for="rfc" class="form-label">RFC:</label>
                <input type="text" maxlength="13" minlength="13" class="form-control" id="rfc" v-model="cliente.rfc">
            </div>
            <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import { URL_API } from '@/utils/constantes';

export default {
    name: 'clienteEditar',
    data: function () {
        return {
            cliente: {},
        };
    },
    created() {
        this.getCliente(this.id);
    },
    methods: {
        actualizar: async function (id) {
            try {
                await axios.put(URL_API + `/clientes/${id}`, { ...this.cliente });
                swal.fire('¡Datos actualizados!', 'Operación completada con éxito', 'success');
                this.$router.push({ name: 'cliente' });
            } catch (error) {
                swal.fire('Error', 'No pude actualizarlo UnU', 'error');
                console.log(error);
            }
        },
        getCliente: async function (id) {
            try {
                const { data } = await axios.get(URL_API + `/clientes/${id}`);
                this.cliente = data;
            } catch (error) {
                swal.fire('Error', 'No pude traer al proveedor UnU', 'error');
                console.log(error);
            }
        }
    },
    props: {
        id: Number,
    },
    components: {

    },
}
</script>