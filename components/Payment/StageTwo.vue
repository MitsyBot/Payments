<template>
  <div class="text-center pt-6 text-xl">
    <section class="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
      <img src="/Mitsy_Think.png" class="rounded-lg object-center pb-6" alt="MITSY_THINK">
    </section>
    <p>Tá, vamos lá!</p>
    <p>Verifique se estas informações estão corretas!</p>
    <p class="pt-4">
      Valor: {{ data.money }}
    </p>
    <p>Usuario: {{ data.user.username }}</p>
    <p>Serviço: {{ data.gateway }}</p>
    <p>Id de referencia: {{ data.reference_id }}</p>
    <p class="pb-4">
      Id de usuario: {{ data.user.id }}
    </p>
    <div class="pt-12">
      <button id="botao" class="button primary" style="width: 100%;" @click="$emit('next-stage')">
        Tudo certo por aqui!
      </button>
    </div>
    <div class="pt-3">
      <button
        id="botao"
        class="button red"
        style="width: 100%;"
        @click="$router.push('/ticket')"
      >
        Não tenho certeza.
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
