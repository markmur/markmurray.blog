import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { formatPrice } from '../utils/currency'

export default function Products(props) {
  const { products } = props.data

  return (
    <div>
      <ul>
        {products.edges.map(
          ({ node: { unit_amount, currency, product, id } }) => (
            <li key={id}>
              <h4>{product.name}</h4>
              <h6>{formatPrice(unit_amount, currency)}</h6>
              {product.images.map(img => (
                <img src={img} />
              ))}
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
  {
    products: allStripeProduct(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          active
          currency
          unit_amount
          product {
            id
            name
            images
          }
        }
      }
    }
  }
`
