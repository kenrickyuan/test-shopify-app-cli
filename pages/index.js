import { Heading, Page, Button } from "@shopify/polaris";

import { ResourcePicker } from '@shopify/app-bridge-react';

import {useState} from  "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

import Link from 'next/link'


const Index = () => {
  

  return (
    <Page
      
      title='Internal App'
    >
      <Link href="/product">
        Product
      </Link>


    </Page>
  )
}

export default Index;
