<template>
    <div class="Detalle">
        <fieldset>
            <legend>Detalle del artículo</legend>
            <b-icon-caret-right-fill/> No. {{ this.articulo.id }}
            <br>  
            <b-icon-caret-right-fill/> Descripción: {{ this.articulo.descripcion }}
            <br>
            <b-icon-caret-right-fill/> Precio: {{ this.articulo.precio }}
            <br>
            <b-icon-caret-right-fill/> Cantidad: {{ this.articulo.cantidad }}
            <br>
            <b-icon-caret-right-fill/> Proveedor: {{ this.articulo.nombreProveedor }}
        </fieldset>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_API } from '@/utils/constantes';

export default {
    name: 'articulosDetalle',
    components: {},
    props: {
        id: Number,
    },
    data: function () {
        return {
            articulo: {},
        };
    },
    created() {
        this.getArticulo(this.id)
    },
    methods: {
        getArticulo: async function (id) {
            try {
                const { data } = await axios.get(URL_API + `/articulos/${id}`);
                this.articulo = data;
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>