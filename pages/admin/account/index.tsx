import { DashboardOutlined } from '@mui/icons-material'
import React from 'react'
import { AdminLayout } from '../../../components/layouts/AdminLayout'

const AccountPage = () => {
  return (
    <AdminLayout
    title='mi cuenta'
    subTitle='Gestionar Cuenta'
    icon={ <DashboardOutlined /> }
>
    <div>AccountPage</div>
    </AdminLayout>
  )
}

export default AccountPage