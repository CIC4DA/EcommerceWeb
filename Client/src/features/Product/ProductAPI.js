export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products') 
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchProductsbyFilters(filter,sort,pagination,admin) {

  let queryString = '';

  for(let key in filter){
    const categoryvalues = filter[key];
    if(categoryvalues.length){
      const lastCategoryValue = categoryvalues[categoryvalues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }
  if(admin){
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) =>{
    const response = await fetch('/products?'+queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data : {products: data, totalItems:+totalItems}});
  }
  );
}

export function fetchAllCategory() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/categories') 
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchAllBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/brands') 
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchProductbyId(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/'+id) 
    const data = await response.json();
    resolve({data});
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/',{
      method : "POST",
      body : JSON.stringify(product),
      headers : {'content-type' : 'application/json'}

    }) 
    const data = await response.json();
    resolve({data});
  }
  );
}

export function updateProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/'+product.id,{
      method : 'PATCH',
      body : JSON.stringify(product),
      headers : {'content-type' : 'application/json'}
    });
    const data = await response.json();
    resolve({data});
  }
  );
}