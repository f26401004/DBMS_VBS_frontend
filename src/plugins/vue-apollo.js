import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)


// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
})

// Cache implementation
const cache = new InMemoryCache(
  {
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'DepositType': 
          return `${object.id}_${object.name}`
          case 'InsuranceType': 
          return `${object.id}_${object.name}`
        case 'DepositPayment': 
          return `${object.id}_${object.term}`
        case 'InsurancePayment':
        return `${object.id}_${object.term}`
        default: return object.id || object._id
      }
    }
  }
)

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default apolloProvider
