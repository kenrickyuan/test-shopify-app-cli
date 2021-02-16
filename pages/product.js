import { Heading, Page, Button } from "@shopify/polaris";

import { ResourcePicker } from '@shopify/app-bridge-react';

import {useState} from  "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

import Link from 'next/link'



const QUERY_SHOP = gql`
  query {
    shop {
      id
      name
      primaryDomain {
        host
      }
      myshopifyDomain
      plan {
        displayName
      }
      timezoneAbbreviation
    }
  }
`;

const GET_PRODUCT_BY_ID = gql`
  query GetProduct($productId: ID!){
    product(id: $productId) {
      title
      id
      tags
      variants(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;
const Product = () => {
  


  // const [fetchStoreDetails, { loading, error, data }] = useLazyQuery(QUERY_SHOP);
  const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCT_BY_ID);


  const [pickerState, setPickerState] = useState(false);

  const handlePicker = (selectPayload) => {
    console.log(selectPayload)
    setPickerState(false)
    // return array of selected product IDs
    const selectedProductIds = selectPayload.selection.map(selection => selection.id)
    console.log(selectedProductIds[0])
    getProduct({variables : { productId : selectedProductIds[0] } })

    console.log(data)
    console.log(loading)
    console.log(error)
    // selectedProductIds.forEach(id => {
    //   const product = useQuery(GET_PRODUCT_BY_ID, {
    //     variables: { id: id } })
    //   console.log(product)
    // })
  }

  return (
    <Page
      title='Product Selector'
      primaryAction={{
        content: 'Select Product',
        onAction: () => setPickerState(true)
      }}
    >
      {/* {data && data.shop && (
        <h1>{data.shop.name}</h1>
      )} */}
      <Link href="/">
        Home
      </Link>
      <ResourcePicker 
        resourceType="Product"
        open={pickerState}
        onSelection={selectPayload => handlePicker(selectPayload)}
        // onSelection={selectPayload => fetchStoreDetails()}
        onCancel={() => setPickerState(false)}
        />
    </Page>
  )
}

export default Product;
