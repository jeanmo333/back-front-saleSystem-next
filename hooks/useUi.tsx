import { useContext } from 'react'
import { UiContext } from '../context'


export const useUi = () => {
    return useContext(UiContext)
}
