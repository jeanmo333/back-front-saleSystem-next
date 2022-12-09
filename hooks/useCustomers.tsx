import { useContext } from 'react'
import { CustomerContext } from '../context'


export const useCustomers = () => {
    return useContext(CustomerContext)
}

