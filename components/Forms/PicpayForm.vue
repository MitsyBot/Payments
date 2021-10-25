<template>
  <div id="wrapper">
    <form
      id="app"
      method="post"
      @submit="checkForm"
    >
      <p v-if="errors.length" class="pt-8 text-red-500">
        <b>Por favor corrija as seguintes informações e tente novamente.</b>
        <ul class="pb-8">
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </p>
      <div style="font-weight: bold;">
        Nome
      </div>
      <input
        id="nome"
        v-model="nome"
        type="text"
        name="nome"
        placeholder="Seu nome"
        style="width: 100%; border: 1px solid"
      >

      <div style="font-weight: bold;">
        Sobrenome
      </div>
      <input
        id="sobrenome"
        v-model="sobrenome"
        type="text"
        name="sobrenome"
        placeholder="Seu sobrenome"
        style="width: 100%; border: 1px solid"
      >

      <div style="font-weight: bold;">
        Email
      </div>
      <input
        id="email"
        v-model="email"
        type="text"
        name="email"
        placeholder="Seu email"
        style="width: 100%; border: 1px solid"
      >

      <div style="font-weight: bold;">
        CPF
      </div>
      <input
        id="cpf"
        v-model="cpf"
        type="text"
        name="cpf"
        placeholder="Seu cpf"
        style="width: 100%; border: 1px solid"
      >

      <div style="font-weight: bold;">
        Numero de telefone
      </div>
      <input
        id="number"
        v-model="number"
        type="text"
        name="number"
        placeholder="Seu numero de telefone"
        style="width: 100%; border: 1px solid"
      >

      <p>As suas informações pessoais serão utilizadas apenas pelo PicPay para processar o pagamento, A mitsy não ira salvar os seus dados pessoais.</p>
      <hr>
      <input id="botao" type="submit" value="Continuar ao pagamento" class="button primary" style="width: 100%;">
    </form>
    <div class="mb-8" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      errors: [],
      nome: null,
      sobrenome: null,
      cpf: null,
      number: null,
      email: null
    }
  },
  mounted () {
    this.$axios.setToken(process.env.API_TOKEN)
    this.$axios.setHeader('Content-Type', 'application/json')
    this.$axios.$get(`http://localhost:5671/api/getpayment/${this.$route.params.id}`)
      .then((response) => {
        if (response[0].paid === 'true' || response[0].prepaid === 'true') {
          this.$router.push('/missing')
        }
      })
  },
  methods: {

    checkForm (e) {
      if (this.nome && this.sobrenome && this.email && this.cpf && this.number) {
        // eslint-disable-next-line no-console
        console.log('[MitsyBackend] Sending data to Polux API')
        this.$axios.setToken(process.env.API_TOKEN)
        this.$axios.setHeader('Content-Type', 'application/json')
        this.$axios.$post(`${process.env.URL}/api/createPicpayPayment`, {
          nome: this.nome,
          sobrenome: this.sobrenome,
          cpf: this.cpf,
          number: this.number,
          buyermail: this.email,
          uuid: this.$route.params.id
        }).then((response) => {
          window.location.href = response
        })
      } else {
        this.errors = []

        if (!this.nome) {
          this.errors.push('Você precisa inserir um nome.')
        }

        if (!this.sobrenome) {
          this.errors.push('Você precisa inserir um sobrenome.')
        }

        if (!this.email) {
          this.errors.push('Você precisa inserir um email.')
        }
        if (!this.cpf) {
          this.errors.push('Você precisa inserir um cpf.')
        }
        if (!this.number) {
          this.errors.push('Você precisa inserir um numero de telefone.')
        }
      }
      e.preventDefault()
    }
  }
}
</script>
