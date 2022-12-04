<template>
    <div class="ArticulosLista text-center">
        <table class="table table-hover table-stripped ">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="articulo in articulos" :key="articulo.id">
                    <td>
                        <a href="" @click.prevent="detalle(articulo.id)">{{ articulo.id }}</a>
                    </td>
                    <td>{{ articulo.descripcion }}</td>
                    <td>{{ articulo.precio }}</td>
                    <td>{{ articulo.cantidad }}</td>
                    <td>
                        <button @click.prevent="editarArticulo(articulo.id)" class="btn btn-primary me-4">Editar</button>
                        <button @click.prevent="eliminarArticulo(articulo.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <section>
            <article class="d-flex justify-content-end">
                <button class="btn btn-outline-primary" @click.prevent="nuevoArticulo()">Nuevo</button>
            </article>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '../../utils/constantes.js';

export default {
    name: "articulosLista",
    components: {},
    data: function () {
        return {
            articulos: []
        };
    },
    created() {
        this.getArticulos();
    },
    methods: {
        getArticulos: async function () {
            try {
                const { data } = await axios.get(URL_API + '/articulos');
                this.articulos = data;
            } catch (error) {
                console.log(error);
            }
        },
        detalle: function (id) {
            this.$router.push({ name: 'articulosDetalle', params: { id } });
        },
        editarArticulo: function (id) {
            this.$router.push({ name: 'articulosEditar', params: { id } });
        },
        eliminarArticulo: async function (id) {
            try {
                await axios.delete(URL_API + `/articulos/${id}`);
                Swal.fire('Artículo eliminado', '¡Eliminaste un artículo! :o', 'success');
                this.getArticulos();
            } catch (error) {
                Swal.fire('Error', 'No pude eliminarlo TnT', 'error');
            }
        },
        nuevoArticulo: function () {
            this.$router.push({ name: 'articulosNuevo' });
        },
    },
}
</script>