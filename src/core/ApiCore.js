  import { API_URL } from './../config';
  import queryString from 'query-string';
 
 export const getProducts = (params) => {

    let query = queryString.stringify(params)

    return fetch(`${API_URL}/product?${query}`)
      .then(res => res.json())
      .then(res => res.products)
      .catch(err => console.error(err))

 }

 export const getBraintreeToken = (userId,token) => {

  return fetch(`${API_URL}/braintree/getToken/${userId}`,{
    method: "GET",
    headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization:`Bearer ${token}`
      }
  })
  .then(res => res.json())
  

}


export const relatedProducts = (id) => {

  return fetch(`${API_URL}/product/related/${id}`)
    .then(res => res.json())
    .then(res => res.products)
    .catch(err => console.error(err))
  
  }

 export const getOneProduct = (id) => {

return  fetch(`${API_URL}/product/${id}`, {
     method: "GET",
     headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
     }
 })
 .then(res => res.json())
 .then(res => res.product)
 .catch(err => console.error(err))

}


export const getOneCategory = (id) => {

  return  fetch(`${API_URL}/category/${id}`, {
       method: "GET",
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json"
       }
   })
   .then(res => res.json())
   .then(res => res.product)
   .catch(err => console.error(err))
  
  }
  
  
 
 export const getCategories = () => {

   return  fetch(`${API_URL}/category`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => res.categories)
    .catch(err => console.error(err))

}



export const filterProducts = (skip, limit, filters) => {

  const data = {
    skip,
    limit,
    filters
  }

return  fetch(`${API_URL}/product/search`, {
     method: "POST",
     headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
     },
     body: JSON.stringify(data)
 })
 .then(res => res.json())
 .then(res => res.products)
 .catch(err => console.error(err))

}


export const processPayment = (userId,token,paymentData) => {

  return fetch(`${API_URL}/braintree/purchase/${userId}`,{
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(paymentData)
  })
  .then(res => res.json())
  

}

export const createOrder =(userId, token, orderData) => {
  return fetch(`${API_URL}/order/create/${userId}`,{ 
  method: "POST",
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(orderData)
})
  .then(res =>res.json())

}


export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API_URL}/category/${categoryId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(res => res.json())
  .catch(err => console.error(err));
  };
  
  
  
  
  export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API_URL}/category/${categoryId}/${userId}`, { // Remplacez API par API_URL
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error));
  };
  

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API_URL}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};


export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API_URL}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};
export const createProduct = (userId, token, product) => {
  return fetch(`${API_URL}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};
