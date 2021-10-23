<template>
  <div>
    <div id="wrapper">
      <div id="payment-methods">
        <NuxtLink to="/checkout/id/gateways/picpay">
          <div class="payment-button">
            <img src="../../../assets/picpay.svg" alt="gateways.picpay.name" style="width: 100%; max-height: 80px;"><span style="display: block;">Cartão de Crédito, Saldo do PicPay</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'InPayment',
  head: {
    title: 'Escolha a forma de pagamento'
  }
}
</script>
