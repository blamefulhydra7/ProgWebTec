<template>
    <div class="ProveedorEditar text-start">
        <form @submit.prevent="actualizar(id)">
            <fieldset>
                <legend>Editar proveedor</legend>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input type="text" class="form-control" id="nombre" v-model="proveedor.nombre">
                </div>
                <div class="mb-3">
                    <label for="rfc" class="form-label">RFC:</label>
                    <input type="text" maxlength="13" minlength="13" class="form-control" id="rfc" v-model="proveedor.rfc">
                </div>
                <div class="mb-3">
                    <label for="direccion" class="form-label">Dirección:</label>
                    <input type="text" class="form-control" id="direccion" v-model="proveedor.direccion">
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Teléfono:</label>
                    <input type="number" :maxlength="10" :minlength="10" class="form-control" id="telefono" v-model="proveedor.telefono">
                </div>
                <div class="mb-3">
                    <label for="observaciones" class="form-label">Observaciones:</label>
                    <input type="text" class="form-control" id="observaciones" v-model="proveedor.observaciones">
                </div>
                <button type="submit" class="btn btn-primary">Actualizar</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import { URL_API } from '@/utils/constantes';

export default {
    name: 'proveedorEditar',
    data: function () {
        return {
            proveedor: {},
        };
    },
    created() {
        this.getProveedor(this.id);
    },
    methods: {
        actualizar: async function (id) {
            try {
                await axios.put(URL_API + `/proveedores/${id}`, { ...this.proveedor });
                swal.fire('¡Datos actualizados!', 'Operación completada con éxito', 'success');
                this.$router.push({ name: 'proveedor' });
            } catch (error) {
                swal.fire('Error', 'No pude actualizarlo UnU', 'error');
                console.log(error);
            }
        },
        getProveedor: async function (id) {
            try {
                const { data } = await axios.get(URL_API + `/proveedores/${id}`);
                this.proveedor = data;
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