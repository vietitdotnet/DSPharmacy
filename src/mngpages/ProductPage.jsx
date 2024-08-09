import { Component } from 'react'

import ProductManager from '../components/manager/product/ProductManager'
export default class ProductPage extends Component {
  render() {
    return (
      <div className='p-4 sm:ml-64'>
        <ProductManager/>
      </div>
    )
  }
}
