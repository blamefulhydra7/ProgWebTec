<template>
    <div class="ProveedorNuevo text-start">
        <form @submit.prevent="guardar()">
            <fieldset>
                <legend>Nueva venta</legend>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Articulo:</label>
                    <select class="form-select" id="descripcion" v-model="venta.articuloID">
                        <option value="0">Seleccione un artículo</option>
                        <option :value="articulo.id" :key="articulo.id" v-for="articulo in articulos">
                            {{ articulo.descripcion }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="precio" class="form-label">Precio:</label>
                    <input type="number" step="1" pattern="\d+" class="form-control" id="precio" v-model="venta.precio" required>
                </div>
                <div class="mb-3">
                    <label for="cantidad" class="form-label">Cantidad:</label>
                    <input type="number" step="1" pattern="\d+" class="form-control" id="cantidad" required
                        v-model="venta.cantidad">
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Cliente:</label>
                    <select class="form-select" id="nombre" v-model="venta.clienteID">
                        <option value="0">Seleccione un Cliente</option>
                        <option :value="cliente.id" v-for="cliente in clientes" :key="cliente.id">
                            {{ cliente.nombre }}
                        </option>
                    </select>
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
    name: 'ventaNuevo',
    components: {},
    data: function () {
        return {
            clientes: [],
            articulos: [],
            venta: { clienteID: 0, articuloID: 0 },
        };
    },
    created() {
        this.getArticulos();
        this.getClientes();
    },
    methods: {
        guardar: async function () {
            try {
                await axios.post(URL_API + '/ventas', { ...this.venta });
                Swal.fire('Nueva venta', '¡Venta guardada con éxito!', 'success');
                this.venta = {};
            } catch (error) {
                Swal.fire('Error', error.response.status === 400 ? error.response.data : 'No pude guardarla UnU', 'error');
                console.log(error);
            }
        },
        getArticulos: async function () {
            try {
                const { data } = await axios.get(URL_API + '/articulos');
                this.articulos = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer los artículos UnU', 'error');
                console.log(error);
            }
        },
        getClientes: async function () {
            try {
                const { data } = await axios.get(URL_API + '/clientes');
                this.clientes = data;
            } catch (error) {
                Swal.fire('Error', 'No pude traer los clientes UnU', 'error');
                console.log(error);
            }
        },
    },
}
</script>