import { db } from "../database";
import { User } from "../models";
import { jwt } from "./";


export const getUser = async (token: string)=> {

    let userId = '';
    //const { token = ''  } = req.cookies as { token: string};

    try {
       userId = await jwt.isValidToken( token );

    } catch (error) {
        console.log(error)
       return "Token de autorización no es válido" 
    }


    return userId;

//     await db.connect();
//     const user = await User.findById( userId ).lean();
//     await db.disconnect();

//     if ( !user ) {
//         throw new Error("No existe usuario con ese id")  
//     }


//     const { _id, email, role, name } = user;

//    return  {_id, email, role, name }
   
  };