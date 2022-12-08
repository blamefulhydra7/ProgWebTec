import { Router } from 'express';
import { createProveedor, deleteProveedor, getProveedor, getProveedores, updateProveedor } from '../controladores/Proveedores.js';
const router = Router();

/**
 * Proveedores
 */
router.get('/', getProveedores);

router.get('/:id', getProveedor)

router.post('/', createProveedor);

router.put('/:id', updateProveedor);

router.delete('/:id', deleteProveedor);

export default router;