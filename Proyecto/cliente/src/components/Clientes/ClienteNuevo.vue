<template>
    <div class="ProveedorNuevo text-start">
        <form @submit.prevent="guardar()">
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" class="form-control" id="nombre" v-model="cliente.nombre" required>
            </div>
            <div class="mb-3">
                <label for="direccion" class="form-label">Dirección:</label>
                <input type="text" class="form-control" id="direccion" v-model="cliente.direccion" required>
            </div>
            <div class="mb-3">
                <label for="rfc" class="form-label">RFC:</label>
                <input type="text" maxlength="13" minlength="13" class="form-control" id="rfc" v-model="cliente.rfc" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import { URL_API } from '@/utils/constantes';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'clienteNuevo',
    components: {},
    data: function () {
        return {
            cliente: {},
        };
    },
    methods: {
        guardar: async function () {
            try {
                await axios.post(URL_API + '/clientes', { ...this.cliente });
                Swal.fire('Nuevo cliente', '¡Cliente guardado con éxito!', 'success');
                this.cliente = {};
            } catch (error) {
                Swal.fire('Error', 'No pude guardarlo UnU', 'error');
                console.log(error);
            }
        }
    },
}
</script>