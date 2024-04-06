import { Form, Input, Modal } from 'antd'
import React from 'react'

function BidModal({showBidModal , setShowBidModal , product , reloadData}) {
    const formRef = React.useRef(null) ;
    const rules = [{required : true , message : 'This Field is Required'}]
    const onFinish = async(vales)=>{
        try {
            
        } catch (error) {
            
        }
    };
  return (
    <Modal onCancel={()=>setShowBidModal(false)} open={showBidModal} centered width={600} onOk={()=>formRef.current.submit()}>
        <div className='flex flex-col gap-5 mb-5'>
            <h1 className='text-2xl font-semibold text-orange-900 text-center'>
                New Bid
            </h1>
            <Form layout='vertical' ref = {formRef} onFinish={onFinish}>
                <Form.Item label="Bid Amount"
                name='bidAmount' rules={rules}>
                    <Input />
                </Form.Item>
                <Form.Item label="Message"
                name='description' rules={rules}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Mobile"
                name='Mobile' rules={rules}>
                    <Input type='number' />
                </Form.Item>
                
            </Form>
        </div>
    </Modal>
  )
}

export default BidModal