import { Modal, Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetAllBids } from '../../../apicalls/products';
import moment from 'moment';
import Divider from '../../../components/Divider';

function Bids(
    {showBidsModal , 
    setShowBidsModal , 
    selectedProduct
    }
) {
  const [bidsData , setBidsData]=React.useState([]) ;
  const dispatch = useDispatch() ; 
  const getData = async()=>{
    try {
      dispatch(SetLoader(true)) ;
      const response = await GetAllBids({
        product : selectedProduct._id ,
      }) ;
      dispatch(SetLoader(false)) ;
      if(response.success){
        setBidsData(response.data) ;
      }
    } catch (error) {
      dispatch(SetLoader(false)) ;
      message.error(error.message) ;
    }
  };

  useEffect(()=>{
    if(selectedProduct){
      getData() ;
    }
  } , [selectedProduct]) ;

  const columns = [
    {
      title : 'Name' , 
      dataIndex : 'name' ,
      render : (text,record)=>{
        return record.buyer.name
      }
    } ,
    {
      title : 'Bid Amount' , 
      dataIndex : 'bidAmount' , 
    } , 

    {
      title : 'Bid Date' , 
      dataIndex : 'createdAt' , 
      render : (text,record)=>{
        return moment(text).format("MMMM Do YYYY , hh:mm a") ;
      }

    } ,
    {
      title : 'Message' , 
      dataIndex : 'Message' , 
    } , 
    {
      title : 'Contact Details' , 
      dataIndex : 'contactDetails' ,
      render : (text, record)=>{
        return (
          <div>
            <p>Phone : {record.Mobile}</p>
            <p>Email : {record.buyer.email}</p>
          </div>
        );
      } ,
    } ,

  ];
  return (
    <Modal title='' open={showBidsModal} onCancel={()=>setShowBidsModal(false)} centered width={1500} footer={null}>
     <div className='flex gap-3 flex-col'>
     <h1 className=' text-primary'>
        Bids
      </h1>
      <Divider />
      <h1 className='text-xl text-gray-500'>
        Product Name : {selectedProduct.name}
      </h1>
      <Table columns={columns} dataSource={bidsData} />
     </div>
    </Modal>
  )
}

export default Bids