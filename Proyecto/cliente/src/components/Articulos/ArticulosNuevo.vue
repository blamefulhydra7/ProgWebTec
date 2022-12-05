<template>
    <div class="ArticulosNuevo text-start">
        <form @submit.prevent="guardar()">
            <fieldset>
                <legend>Nuevo artículo</legend>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción:</label>
                    <input type="text" class="form-control" id="descripcion" v-model="articulo.descripcion" required>
                    <div class="form-text">Describe el producto que vendes.</div>
                </div>
                <div class="mb-3">
                    <label for="precio" class="form-label">Precio:</label>
                    <input type="number" class="form-control" id="precio" v-model="articulo.precio" required>
                </div>
                <div class="mb-3">
                    <label for="cantidad" class="form-label">Cantidad:</label>
                    <input type="number" class="form-control" id="cantidad" v-model="articulo.cantidad" required>
                </div>
                <select class="form-select mb-3" aria-label="Proveedores" v-model="articulo.proveedorid">
                    <option selected value="0">Selecciona un proveedor</option>
                    <option v-for="proveedor in proveedores" :value="proveedor.id" :key="proveedor.id">
                        {{ proveedor.nombre }}
                    </option>
                </select>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '@/utils/constantes';

export default {
    name: 'articulosNuevo',
    components: {},
    data: function () {
        return {
            articulo: {proveedorid: 0},
            proveedores: [],
        };
    },
    created() {
        this.getProveedores();
    },
    methods: {
        guardar: async function () {
            try {
                await axios.post(URL_API + '/articulos', { ...this.articulo });
                Swal.fire('Nuevo artículo', '¡Artículo guardado con éxito!', 'success');
                this.articulo = {};
                this.getProveedores();
            } catch (error) {
                Swal.fire('Error', 'No pude guardarlo UnU', 'error');
                console.log(error);
            }
        },
        getProveedores: async function () {
            try {
                const { data } = await axios.get(URL_API + '/proveedores');
                this.proveedores = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer a los proveedores UnU', 'error');
                console.log(error);
            }
        },
    },
}
</script>