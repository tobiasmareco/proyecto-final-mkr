const publishablekey='pk_test_51N4DhbGkt4TEGAhYie8YtlBnA2iraPRAdVvT8FwVs0ChmQpjlpdRFaKFGuGsGrczuKcQHWMAZ4fX7P05Tktyzmjr000fZgL1a1'
const [product, setProduct]=useState({
    name: 'Premium',
    price: 20,  
});
const handleSuccess = () => {
  MySwal.fire({
    icon: 'success',
    title: 'Payment was successful',
    time: 4000,
  });
};
const handleFailure = () => {
  MySwal.fire({
    icon: 'error',
    title: 'Payment was not successful',
    time: 4000,
  });
};
const payNow = async token => {
  try {
    const response = await axios({
      url: '/payment',
      method: 'post',
      data: {
        amount: product.price * 100,
        token,
      },
    });
    if (response.status === 200) {
      handleSuccess();
    }
  } catch (error) {
    handleFailure();
    console.log(error);
  }
};

export const paymentController = (req, res) => {



};  
