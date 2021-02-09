import "isomorphic-fetch";
import { gql } from "apollo-boost";

import { useQuery } from "@apollo/react-hooks";


const GET_PRODUCT_BY_ID = id => {
  return gql`
    query {
      product(id: ${id}) {
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
}

export const getProductById = id => {
  return useQuery(GET_PRODUCT_BY_ID(id))
}