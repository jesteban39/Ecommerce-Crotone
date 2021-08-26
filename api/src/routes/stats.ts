import { request, Request, Response, Router } from 'express'
import { isEmptyStatement } from 'typescript';
import { Sale } from '../db';
import { Item } from '../models/Item';
const router = Router();




router.get('/', async (req: Request, res: Response) => {

    const compras=await Sale.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [
            {
                model: Item,
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        ]
    })

    let suma=0;
    
    compras.forEach((c:any)=>c.items.forEach((i:any)=>suma+=(i.units*i.salePrice)))
    //543
    return res.json(suma)   

})


router.get('/top5',async(req:Request,res:Response)=>{

    const compras=await Sale.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [
            {
                model: Item,
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        ]
    })

    const productsCant:any={};

    compras.forEach((c:any)=>c.items.forEach((i:any)=>{
        if(!productsCant.hasOwnProperty(i.productId)){
            productsCant[i.productId]={productName:i.productName,units:i.units}
        }else{
            productsCant[i.productId].units+=i.units;
        }
    }))
    
    const productsCantToArray=[];
    
    for(const p in productsCant){
        productsCantToArray.push({product:productsCant[p].productName,units:productsCant[p].units})
    }
    
    console.log(productsCantToArray)
    
    for(let i=0; i<productsCantToArray.length; i++){
        for(let j=i+1; j<productsCantToArray.length; j++){
            if(productsCantToArray[j].units>productsCantToArray[i].units){
                let aux:any=productsCantToArray[i];
                productsCantToArray[i]=productsCantToArray[j];
                productsCantToArray[j]=aux;
            }
        }
    }
    
    let arrayProducts=[];
    let arrayUnits=[];
    
    for(let i=0; i<5; i++){
        arrayProducts.push(productsCantToArray[i].product)
        arrayUnits.push(productsCantToArray[i].units)
    }
    
    console.log(productsCantToArray)
    console.log(arrayProducts)
    console.log(arrayUnits)

    return res.json({
        products:arrayProducts,
        units:arrayUnits
    })


})






export default router;










