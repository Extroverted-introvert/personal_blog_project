import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Fade } from "react-reveal";
import Navbar from './../Navbar/Navbar.js';
import Footer from './../footer/Footer.js';
import TopButton from '../topButton/TopButton.js';

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const slug = props.match.params.id;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`);
                setBlog(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [props.match.params.id]);

    const createBlog = () => {
        return {__html: blog.content}
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
        <Fade top duration={1000} distance="20px">
        < Navbar />
        <div className='container mt-3' style={{ 
            backgroundImage: `url("https://via.placeholder.com/500")` 
          }}>
            <h1 className='display-2'>{blog.title}</h1>
            <h2 className='text-muted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h2>
            <h4>{blog.month} {blog.day}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
        </div>
        <Footer />
        <TopButton />
        </Fade>
    );
};

export default BlogDetail;
