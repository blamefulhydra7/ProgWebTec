import { Router } from 'express';
import { compraArticulo, createArticulo, deleteArticulo, getArticulo, getArticulos, updateArticulo } from '../controladores/Articulos.js';

const router = Router();

/**
 * Artículos
 */
router.get('/', getArticulos);

router.get('/:id', getArticulo);

router.post('/', createArticulo);

router.put('/:id', updateArticulo);

router.patch('/compra/:id', compraArticulo);

router.delete('/:id', deleteArticulo);

export default router;