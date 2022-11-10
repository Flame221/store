import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  {
    category(input: { title: "all" }) {
      products {
        id
        name
        gallery
        prices {
          currency {
            label
          }
          amount
        }
      }
    }
  }
`;

export const GET_CLOTHES_PRODUCTS = gql`
  {
    category(input: { title: "clothes" }) {
      products {
        id
        name
        gallery
        prices {
          currency {
            label
          }
          amount
        }
      }
    }
  }
`;

export const GET_TECH_PRODUCTS = gql`
  {
    category(input: { title: "tech" }) {
      products {
        id
        name
        gallery
        prices {
          currency {
            label
          }
          amount
        }
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_SPECIFIC_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      name
      category
      inStock
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      gallery
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      description
      brand
    }
  }
`;
