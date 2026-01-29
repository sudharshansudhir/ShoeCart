import { useContext,createContext, useState } from "react";

export const MyContext=createContext();

export const Contpro=({children})=>{
    const [Mycart,setMycart]=useState([])
    const [Login,setLogin]=useState(true)

    function addtocart(item){
        const exists = Mycart.find(prod => prod._id === item._id);
        if(exists){
             const updatedCart = Mycart.map(prod => {
            if (prod._id === item._id) {
                return { ...prod, defaultQuantity: prod.defaultQuantity + 1 }
            } else {
                return prod;
            }
        });
        setMycart(updatedCart);
        }
        else{
          setMycart([...Mycart,item])  
        }
        
    }

    
    return(
    <MyContext.Provider value={{Mycart,Login,setLogin,addtocart,setMycart}}>
        {children}
    </MyContext.Provider>
)

}

const useNewCon=()=>useContext(MyContext)
export default useNewCon