import fetch from "node-fetch";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import { AppProvider, Navigation } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import {HomeMajor, OrdersMajor, ProductsMajor} from '@shopify/polaris-icons';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


import { authenticatedFetch } from "@shopify/app-bridge-utils";

let app;

const AuthSettings = () => {
  app = useAppBridge();
  console.log(app);
  return null;
}

// const client = new ApolloClient({
//   fetch: fetch,
//   fetchOptions: {
//     credentials: "include",
//   },
//   link: new HttpLink({
//     credentials: 'same-origin',
//     fetch: authenticatedFetch(app)
//   }),
// });

const client = new ApolloClient({
  link: new HttpLink({
    credentials: 'same-origin',
    fetch: authenticatedFetch(app)
  }),
  cache: new InMemoryCache()
});


// client.fetch('https://kenrick-test-internal-app.myshopify.com/admin/api/2021-01/blogs/count.json')
//   .then(response => response.json())
//   .then(data => console.log(data))

class MyApp extends App {
  
  render() {
    const { Component, pageProps, shopOrigin } = this.props;

    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            shopOrigin: shopOrigin,
            forceRedirect: true,
          }}
        >
          <AuthSettings />
          <ApolloProvider client={client}>
            {/* <Navigation location="/">
              <Navigation.Section
                items={[
                  {
                    url: '/',
                    label: 'Home',
                    icon: HomeMajor,
                  },
                  {
                    url: '/product',
                    label: 'Products',
                    icon: ProductsMajor,
                    subNavigationItems: [
                      {
                        url: '/admin/products',
                        disabled: false,
                        label: 'All products',
                      },
                      {
                        url: '/admin/products/inventory',
                        disabled: false,
                        label: 'Inventory',
                      },
                    ],
                  },
                ]}
              />
            </Navigation> */}
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shopOrigin: ctx.query.shop,
  };
};

export default MyApp;
