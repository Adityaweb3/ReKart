import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProductById, GetProducts } from '../../apicalls/products';
import { message } from 'antd';
import { SetLoader } from '../../redux/loadersSlice';
import Divider from '../../components/Divider';
import { useNavigate, useParams } from 'react-router-dom';

function ProductInfo() {
    const [selectedImageIndex , setSelectedImageIndex]=React.useState(0) ;
    const [product , setProduct]=React.useState(null) ;
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const {id}= useParams() ;

    const getData = async() =>{
        try {
          dispatch(SetLoader(true)) ;
          const response = await GetProductById(id) ;
          dispatch(SetLoader(false)) ;
          if(response.success){
            setProduct(response.data) ;
          }
        } catch (error) {
          dispatch(SetLoader(false)) ;
          message.error(error.message) ;
        }
      }
    
      React.useEffect(()=>{
        getData() 
    
      },[])

  return (
    product && <div>
        <div className='grid grid-cols-2'>
            <div className='flex flex-col gap-5'>
                <img src={product.images[selectedImageIndex]} alt="" className='w-full h-96 object-cover rounded-md' />
                <div className='flex gap-5'>
                    {product.images.map((image , index)=>{
                        return (
                            <img className={
                                "w-20 h-20 object-cover rounded-md cursor-pointer"+
                                (selectedImageIndex===index ?"border-2 border-green-700 border-dashed p-2" : "")
                            }
                            onClick={()=>setSelectedImageIndex(index)}
                            src={image}
                            alt="" />
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductInfo