import { useContext } from 'react'
import { CategoryContext } from '../context'

export const useCategories = () => {
    return useContext(CategoryContext)
}

