<template>
    <div class="ArticuloEditar text-start">
        <form @submit.prevent="actualizar(id)">
            <label for="descripcion">Descripción: </label>
            <input type="text" v-model="articulo.descripcion" id="descripcion" class="form-control">
            <br>
            <label for="precio">Precio: </label>
            <input type="text" v-model="articulo.precio" id="precio" class="form-control">
            <br>
            <label for="cantidad">Cantidad: </label>
            <input type="text" v-model="articulo.cantidad" id="cantidad" class="form-control">
            <br>
            <select class="form-select" aria-label="Proveedores">
                <option v-for="proveedor in proveedores" :value="proveedor.id"
                    :selected="(proveedor.id === articulo.proveedorid)" :key="proveedor.id">{{ proveedor.nombre }}
                </option>
            </select>
            <br>
            <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import { URL_API } from '@/utils/constantes';

export default {
    name: 'articulosEditar',
    data: function () {
        return {
            articulo: {},
            proveedores: [],
        };
    },
    created() {
        this.getArticulo(this.id);
        this.getProveedores();
    },
    methods: {
        actualizar: async function (id) {
            try {
                await axios.put(URL_API + `/articulos/${id}`, { ...this.articulo });
                swal.fire('¡Datos actualizados!', 'Operación completada con éxito', 'success');
                this.$router.push({ name: 'articulos' });
            } catch (error) {
                swal.fire('ocurrió un error :c', '', 'error');
                console.log(error);
            }
        },
        getArticulo: async function (id) {
            try {
                const { data } = await axios.get(URL_API + `/articulos/${id}`);
                this.articulo = data;
            } catch (error) {
                console.log(error);
            }
        },
        getProveedores: async function () {
            try {
                const { data } = await axios.get(URL_API + '/proveedores');
                this.proveedores = data;
            } catch (error) {
                swal.fire('Error', 'No pude traer a los proveedores UnU', 'error');
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