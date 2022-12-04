<template>
    <div class="VentasLista text-center">
        <table class="table table-hover table-stripped ">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Artículo</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Cliente</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="venta in ventas" :key="venta.id">
                    <td>
                        <a href="" @click.prevent="detalle(venta.id)">{{ venta.id }}</a>
                    </td>
                    <td>{{ venta.descripcion }}</td>
                    <td>{{ venta.precio }}</td>
                    <td>{{ venta.cantidad }}</td>
                    <td>{{ venta.nombre }}</td>
                    <td>
                        <button @click.prevent="eliminarVenta(venta.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <section>
            <article class="d-flex justify-content-end">
                <button class="btn btn-outline-primary" @click.prevent="nuevaVenta()">Nuevo</button>
            </article>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '../../utils/constantes.js';

export default {
    name: "ventasLista",
    components: {},
    data: function () {
        return {
            ventas: []
        };
    },
    created() {
        this.getVentas();
    },
    methods: {
        getVentas: async function () {
            try {
                const { data } = await axios.get(URL_API + '/ventas');
                this.ventas = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer ventas UnU', 'error');
                console.log(error);
            }
        },
        detalle: function (id) {
            this.$router.push({ name: 'ventaDetalle', params: { id } });
        },
        eliminarVenta: async function (id) {
            try {
                await axios.delete(URL_API + `/ventas/${id}`);
                Swal.fire('Venta eliminada', '¡Eliminaste una venta! :o', 'success');
                this.getVentas();
            } catch (error) {
                Swal.fire('Error', 'No pude eliminarla TnT', 'error');
            }
        },
        nuevaVenta: function () {
            this.$router.push({ name: 'ventaNuevo' });
        },
    },
}
</script>