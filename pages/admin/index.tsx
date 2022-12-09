import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined, Home } from '@mui/icons-material';

import { useRouter } from "next/router";
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import { useAuth } from '../../hooks';
//import { DashboardSummaryResponse } from '../../interfaces';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';
import axios from 'axios';
import error from 'next/error';
import { amatecApi } from '../../api';

const DashboardPage = () => {
    const router = useRouter();

   // const { isLoggedIn } = useAuth();


   




  /*

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
      const interval = setInterval(()=>{
        console.log('Tick');
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
      }, 1000 );
    
      return () => clearInterval(interval)
    }, []);
    



    if ( !error && !data ) {
        return <></>
    }

    if ( error ){
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }


    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;

*/

//if(isLoggedIn) return <><FullScreenLoading/></>
  return (
    <AdminLayout 
    title={'Dashboard'} 
    subTitle={'estadistica del sistema'}
    icon={<Home/>}
    >

        <Grid container spacing={2}>
            
            <SummaryTile 
                title={ 7 }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ 8 }
                subTitle="Ordenes pagadas"
                icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ 8 }
                subTitle="Ordenes pendientes"
                icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ 6}
                subTitle="Clientes totales"
                icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ 4}
                subTitle="Productos totales"
                icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ 7 }
                subTitle="Sin existencias"
                icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ 9}
                subTitle="Bajo inventario"
                icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ 8 }
                subTitle="Actualización en:"
                icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

        </Grid>

        </AdminLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//        // await jwt.isValidToken( token );
//         // const { data } = await amatecApi.get(`/auth/checkToken/${token}`);
//        // await amatecApi.get(`/auth/checkToken/${token}`);
//        if(token){
//         router.push("/admin");
//         isValidToken = true;
//        }
     
//     } catch (error) {
//         isValidToken = false;
//     }

//     if ( !isValidToken ) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
        
//         }
           
            
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }







export default DashboardPage
           