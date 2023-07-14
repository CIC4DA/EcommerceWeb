export function addtocart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/cart',{
      method : 'POST',
      body : JSON.stringify(item),
      headers : {'content-type' : 'application/json'}
    });
    const data = await response.json();
    resolve({data})
  }
  );
}

export function fetchItemsbyUserId() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/cart');
    const data = await response.json();
    resolve({data});
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/cart/'+update.id,{
      method : 'PATCH',
      body : JSON.stringify(update),
      headers : {'content-type' : 'application/json'}
    });
    const data = await response.json();
    console.log(data);
    resolve({data});
  }
  );
}

export function deleteItemsFromCart(itemId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/cart/'+itemId,{
      method : 'DELETE',
      headers : {'content-type' : 'application/json'}
    });
    const data = await response.json();
    resolve({data : { id : itemId}});
  }
  );
}

export async function resetCart() {
  return new Promise(async (resolve) =>{
    const response = await fetchItemsbyUserId();
    const items = response.data;

    for(let item of items){
      await deleteItemsFromCart(item.id);
    }
    resolve({status : 'success'});
  }
  );

}