

export default async function chargeCardNonce(nonce, amount){
  let amount_money = {
    "amount": amount,
    "currency": "USD"
  }
  let body = JSON.stringify({nonce, amount_money});
  console.log(body);
  const response = await fetch('https://lazy-drink-payment.herokuapp.com/payment', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
try{
  const responseJson = await response.json();
  if(responseJson.errorMessage != null){
    console.log(responseJson.errorMessage);
  }
}
catch(error){
  console.log(error.message);
}
}
