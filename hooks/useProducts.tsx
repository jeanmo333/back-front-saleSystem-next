import { useContext } from 'react'
import { ProductContext } from '../context'


export const useProducts = () => {
    return useContext(ProductContext)
}

