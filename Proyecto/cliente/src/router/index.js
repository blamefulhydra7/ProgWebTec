import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Articulos from '../views/Articulos.vue';
import Proveedor from '../views/Proveedor.vue';
import Cliente from '../views/Clientes.vue';
import Venta from '../views/Ventas.vue';
import { ArticulosDetalle, ArticulosNuevo, ArticulosEditar } from '../components/Articulos';
import { ProveedorDetalle, ProveedorEditar, ProveedorNuevo } from '../components/Proveedores';
import { ClienteDetalle, ClienteEditar, ClienteNuevo } from '../components/Clientes';
import { VentaDetalle, VentaNuevo } from '../components/Ventas';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: Articulos,
  },
  {
    path: '/articulos/detalle',
    name: 'articulosDetalle',
    component: ArticulosDetalle,
    props: true
  },
  {
    path: '/articulos/editar',
    name: 'articulosEditar',
    component: ArticulosEditar,
    props: true,
  },
  {
    path: '/articulos/nuevo',
    name: 'articulosNuevo',
    component: ArticulosNuevo,
  },
  {
    path: '/proveedores',
    name: 'proveedor',
    component: Proveedor,
  },
  {
    path: '/proveedores/detalle',
    name: 'proveedorDetalle',
    component: ProveedorDetalle,
    props: true
  },
  {
    path: '/proveedores/editar',
    name: 'proveedorEditar',
    component: ProveedorEditar,
    props: true,
  },
  {
    path: '/proveedores/nuevo',
    name: 'proveedorNuevo',
    component: ProveedorNuevo,
  },
  {
    path: '/clientes',
    name: 'cliente',
    component: Cliente,
  },
  {
    path: '/clientes/detalle',
    name: 'clienteDetalle',
    component: ClienteDetalle,
    props: true
  },
  {
    path: '/clientes/editar',
    name: 'clienteEditar',
    component: ClienteEditar,
    props: true,
  },
  {
    path: '/clientes/nuevo',
    name: 'clienteNuevo',
    component: ClienteNuevo,
  },
  {
    path: '/ventas',
    name: 'venta',
    component: Venta,
  },
  {
    path: '/ventas/detalle',
    name: 'ventaDetalle',
    component: VentaDetalle,
    props: true
  },
  {
    path: '/ventas/nuevo',
    name: 'ventaNuevo',
    component: VentaNuevo,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
