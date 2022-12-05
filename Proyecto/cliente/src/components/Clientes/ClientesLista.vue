<template>
    <div class="ClientesLista text-center">
        <table class="table table-hover table-stripped ">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">RFC</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>
                        <a href="" @click.prevent="detalle(cliente.id)">{{ cliente.id }}</a>
                    </td>
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.direccion }}</td>
                    <td>{{ cliente.rfc }}</td>
                    <td>
                        <button @click.prevent="editarCliente(cliente.id)" class="btn btn-primary me-4">Editar</button>
                        <button @click.prevent="eliminarCliente(cliente.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <section>
            <article class="d-flex justify-content-end">
                <button class="btn btn-outline-primary" @click.prevent="nuevoCliente()">Nuevo</button>
            </article>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '../../utils/constantes.js';

export default {
    name: "clientesLista",
    components: {},
    data: function () {
        return {
            clientes: []
        };
    },
    created() {
        this.getClientes();
    },
    methods: {
        getClientes: async function () {
            try {
                const { data } = await axios.get(URL_API + '/clientes');
                this.clientes = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer clientes UnU', 'error');
                console.log(error);
            }
        },
        detalle: function (id) {
            this.$router.push({ name: 'clienteDetalle', params: { id } });
        },
        editarCliente: function (id) {
            this.$router.push({ name: 'clienteEditar', params: { id } });
        },
        eliminarCliente: async function (id) {
            try {
                const result = await Swal.fire({
                    title: '¿Seguro de borrar el cliente?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    denyButtonText: 'No',
                });

                if (result.isConfirmed) {
                    await axios.delete(URL_API + `/clientes/${id}`);
                    Swal.fire('Cliente eliminado', '¡Eliminaste un cliente! :o', 'success');
                    this.getClientes();
                }
                else {
                    Swal.fire('Cancelado', 'Tu cliente sigue vivo :D', 'info');
                }
            } catch (error) {
                Swal.fire('Error', 'No pude eliminarlo TnT', 'error');
            }
        },
        nuevoCliente: function () {
            this.$router.push({ name: 'clienteNuevo' });
        },
    },
}
</script>