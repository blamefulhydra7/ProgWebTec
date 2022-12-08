import { Router } from 'express';
import { createVenta, deleteVenta, getVenta, getVentas, updateVenta } from '../controladores/Ventas.js';
const router = Router();

/**
 * Ventas
 */
router.get('/', getVentas);

router.get('/:id', getVenta)

router.post('/', createVenta);

router.put('/:id', updateVenta);

router.delete('/:id', deleteVenta);

export default router;