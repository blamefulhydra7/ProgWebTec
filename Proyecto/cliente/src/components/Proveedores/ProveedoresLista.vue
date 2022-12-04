<template>
    <div class="ProveedoresLista text-center">
        <table class="table table-hover table-stripped ">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">RFC</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="proveedor in proveedores" :key="proveedor.id">
                    <td>
                        <a href="" @click.prevent="detalle(proveedor.id)">{{ proveedor.id }}</a>
                    </td>
                    <td>{{ proveedor.nombre }}</td>
                    <td>{{ proveedor.rfc }}</td>
                    <td>{{ proveedor.direccion }}</td>
                    <td>{{ proveedor.telefono }}</td>
                    <td>
                        <button @click.prevent="editarProveedor(proveedor.id)"
                            class="btn btn-primary me-4">Editar</button>
                        <button @click.prevent="eliminarProveedor(proveedor.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <section>
            <article class="d-flex justify-content-end">
                <button class="btn btn-outline-primary" @click.prevent="nuevoProveedor()">Nuevo</button>
            </article>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '../../utils/constantes.js';

export default {
    name: "proveedorLista",
    components: {},
    data: function () {
        return {
            proveedores: []
        };
    },
    created() {
        this.getProveedores();
    },
    methods: {
        getProveedores: async function () {
            try {
                const { data } = await axios.get(URL_API + '/proveedores');
                this.proveedores = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer proveedores UnU', 'error');
                console.log(error);
            }
        },
        detalle: function (id) {
            this.$router.push({ name: 'proveedorDetalle', params: { id } });
        },
        editarProveedor: function (id) {
            this.$router.push({ name: 'proveedorEditar', params: { id } });
        },
        eliminarProveedor: async function (id) {
            try {
                await axios.delete(URL_API + `/proveedores/${id}`);
                Swal.fire('Proveedor eliminado', '¡Eliminaste un proveedor! :o', 'success');
                this.getProveedores();
            } catch (error) {
                Swal.fire('Error', 'No pude eliminarlo TnT', 'error');
            }
        },
        nuevoProveedor: function () {
            this.$router.push({ name: 'proveedorNuevo' });
        },
    },
}
</script>