import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/product';
import Wrapper from '../wrapper';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    };
    getProducts();
  }, []);

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await fetch(`http://localhost:8000/api/prodcuts/${id}`, {
        method: 'DELETE',
      });

      setProducts(products.filter((product: Product) => product.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className='chartjs-size-monitor'></div>
      <div className='table-responsive'>
        <Link
          to='/admin/products/create'
          className='btn btn-sm btn-outline-secondary'
        >
          Add
        </Link>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.image} alt='prod' />
                </td>
                <td>{product.title}</td>
                <td>{product.likes}</td>
                <td>
                  <div className='btn-group mr-2'>
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className='btn btn-sm btn-outline-secondary'
                    >
                      Edit
                    </Link>
                    <button
                      className='btn btn-sm btn-outline-secondary'
                      onClick={() => del(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Products;
