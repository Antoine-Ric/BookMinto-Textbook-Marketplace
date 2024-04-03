export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  

  export const calculateSelectedProductPrices = (selectedProduct) => {
    // Check if selectedProduct is not null or undefined
    if (!selectedProduct) {
      return null; // or throw an error, depending on your application logic
    }
  
    // Calculate the items price for the selected product
    const itemsPrice = addDecimals(selectedProduct.price * selectedProduct.qty);
  
    // Calculate the shipping price based on the items price (if order is over $100 then free, else $10 shipping cost)
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  
    // Calculate the tax price (15% tax based on items price)
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  
    // Calculate the total price including items, shipping, and tax
    const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));
  
    // Return an object containing the calculated prices
    return {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  };
  