<template>
  <div>
    <h1 class="text-center text-black-900 pt-20 text-6xl font-bold pb-16">
      Nossos serviços
    </h1>
    <a href="https://mitsy.website/premium">
      <div id="wrapper">
        <div id="payment-methods">
          <div class="payment-button">
            <img src="../assets/mitsy_coffee.png" alt="gateways.picpay.name" style="width: 100%; max-height: 100%; align: center;   justify-content: center; align-content: center;"><span style="display: block; text-align: center;">Premium Mitsybot</span></div>
        </div>
      </div>
    </a>
    <PayFooter />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Gateway de pagamentos oficial da PoluxTrail'
  }
}
</script>
