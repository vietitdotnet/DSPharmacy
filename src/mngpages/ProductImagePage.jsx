import { Component } from 'react'

import ImageManager from '../components/manager/product/ImageManager'
export default class ProductImagePage extends Component {
  render() {
    return (
      <div className='p-4 sm:ml-64'>
        <ImageManager/>
      </div>
    )
  }
}
