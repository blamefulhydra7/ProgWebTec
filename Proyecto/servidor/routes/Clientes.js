import { Router } from 'express';
import { createCliente, deleteCliente, getCliente, getClientes, updateCliente } from '../controladores/Clientes.js';
const router = Router();

/**
 * Clientes
 */
router.get('/', getClientes);

router.get('/:id', getCliente);

router.post('/', createCliente);

router.put('/:id', updateCliente);

router.delete('/:id', deleteCliente);

export default router;