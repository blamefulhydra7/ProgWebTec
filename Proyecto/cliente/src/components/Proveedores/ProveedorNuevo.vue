<template>
    <div class="ProveedorNuevo text-start">
        <form @submit.prevent="guardar()">
            <fieldset>
                <legend>Nuevo proveedor</legend>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input type="text" class="form-control" placeholder="El nombre del proveedor..." id="nombre" v-model="proveedor.nombre" required>
                </div>
                <div class="mb-3">
                    <label for="rfc" class="form-label">RFC:</label>
                    <input type="text" maxlength="13" minlength="13" placeholder="RFC del proveedor..." class="form-control" id="rfc" v-model="proveedor.rfc" required>
                </div>
                <div class="mb-3">
                    <label for="direccion" class="form-label">Dirección:</label>
                    <input type="text" class="form-control" id="direccion" placeholder="Dirección del proveedor..." v-model="proveedor.direccion" required>
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Teléfono:</label>
                    <input type="tel" pattern="[0-9]{10}" placeholder="0000000000" class="form-control" id="telefono" v-model="proveedor.telefono" required>
                </div>
                <div class="mb-3">
                    <label for="observaciones" class="form-label">Observaciones:</label>
                    <input type="text" placeholder="Observaciones al proveedor..." class="form-control" id="observaciones" v-model="proveedor.observaciones" required>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import { URL_API } from '@/utils/constantes';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'proveedorNuevo',
    components: {},
    data: function () {
        return {
            proveedor: {},
        };
    },
    methods: {
        guardar: async function() {
            try {
                await axios.post(URL_API + '/proveedores', {...this.proveedor});
                Swal.fire('Nuevo proveedor', '¡Proveedor guardado con éxito!', 'success');
                this.proveedor = {};
            } catch (error) {
                Swal.fire('Error', 'No pude guardarlo UnU', 'error');
                console.log(error);
            }
        }
    },
}
</script>