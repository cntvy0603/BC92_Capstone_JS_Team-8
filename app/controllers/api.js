class Api {
  fetchProductsApi() {
    const promise = axios({
      url: "https://696366012d146d9f58d35d32.mockapi.io/api/products", 
      method: "GET",
    });

    return promise;
  }

  deleteProductByIdApi(id) {
    const promise = axios({
      url: `https://696366012d146d9f58d35d32.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });

    return promise;
  }

  addProductApi(product) {
    const promise = axios({
      url: `https://696366012d146d9f58d35d32.mockapi.io/api/products`,
      method: "POST",
      data: product,
    });
    return promise;
  }

  getProductByIdApi(id) {
    const promise = axios({
      url: `https://696366012d146d9f58d35d32.mockapi.io/api/products/${id}`,
      method: "GET",
    });

    return promise;
  }

  updateProductByIdApi(product) {
    const promise = axios({
      url: `https://696366012d146d9f58d35d32.mockapi.io/api/products/${product.id}`,
      method: "PUT",
      data: product,
    });

    return promise;
  }
}

export default Api;





