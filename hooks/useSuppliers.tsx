import { useContext } from 'react'
import { SuplierContext } from '../context'

export const useSuppliers = () => {
    return useContext(SuplierContext)
}

