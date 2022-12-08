<template>
    <div class="ArticulosCompra text-start">
        <form @submit.prevent="guardar(articulo.id)">
            <fieldset>
                <legend>Compra de inventario</legend>
                <div class="mb-3">
                    <label for="precio" class="form-label">Artículo:</label>
                    <select class="form-select mb-3" aria-label="articulos" v-model="articulo.id">
                        <option selected value="0">Selecciona un artículo</option>
                        <option v-for="art in articulos" :value="art.id" :key="art.id">
                            {{ art.descripcion }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="cantidad" class="form-label">Cantidad:</label>
                    <input type="number" class="form-control" id="cantidad" v-model="articulo.cantidad" required>
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
    name: 'articulosCompra',
    methods: {
        guardar: async function (id) {
            try {
                if (!id) {
                    Swal.fire('Cuidado', 'No has seleccionado ningún producto :o', 'warning');
                    return;
                }

                await axios.patch(URL_API + `/articulos/compra/${id}`, this.articulo);

                this.articulo = {};
                Swal.fire('Guardado', 'Has comprado más producto :D', 'success');
            } catch (error) {
                Swal.fire('Error', 'No pude guardar la compra', 'error');
                console.log(error);
            }
        },
        getArticulos: async function () {
            try {
                const { data } = await axios.get(URL_API + '/articulos');
                this.articulos = data;
                console.log(this.articulos);
            } catch (error) {
                Swal.fire('Error', 'No pude traer los artículos UnU', 'error');
            }
        }
    },
    components: {},
    created() {
        this.getArticulos();
    },
    data: function () {
        return {
            articulos: [],
            articulo: {},
        };
    }
}
</script>