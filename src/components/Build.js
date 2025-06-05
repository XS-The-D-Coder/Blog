import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Build = () => {
    const [data, setData]= useState({
        title: "",
        author: "",
        body: ""
    })
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setData((prev)=>{
            return {...prev, [name]: value}
        })
    }




    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/blogs', data)
        .then(res =>{

            toast.success('new blog added successfully',{
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            })
        })

        .catch(err =>{
            console.error('Error details:', err?.response?.data || err.message || err); 
            toast.error('An Error occurred when Adding the blog',{
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            })
        })
    }




    return(
        <div>
            <h5 className="text-danger mb-3">Add new blog</h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="title" value={data.title} onChange={handleChange} placeholder="enter the title"/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Author:</Form.Label>
                    <Form.Control type="text" name="author" value={data.author} onChange={handleChange} placeholder="enter author"/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control as="textarea" name="body" value={data.body} onChange={handleChange} rows={3} placeholder="enter content of the blog..."/>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3"> Save Blog</Button>
                <ToastContainer/>

            </Form>
        </div>
    );

    
}

export default Build;