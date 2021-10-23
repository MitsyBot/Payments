<template>
  <div id="wrapper">
    <div style="font-weight: bold;">
      Nome
    </div>
    <input
      id="nome"
      onchange="allfilled(), filled('nome')"
      type="text"
      nome="Name"
      placeholder="Seu nome"
      style="width: 100%; border: 1px solid rgb(255, 37, 37)"
    >
    <div id="notnome" style="color: rgb(255, 37, 37);">
      Nome Inválido!
    </div>
    <div style="font-weight: bold;">
      Sobrenome
    </div>
    <input id="sobrenome" onchange="allfilled(), filled('sobrenome')" type="text" placeholder="Seu sobrenome" style="width: 100%; border: 1px solid rgb(255, 37, 37)">
    <div id="notsobrenome" style="color: rgb(255, 37, 37);">
      Sobrenome Inválido!
    </div>
    <div style="font-weight: bold;">
      Email
    </div>
    <input id="email" onchange="allfilled(), filled('email')" type="text" placeholder="exemplo@mitsy.website" style="width: 100%; border: 1px solid rgb(255, 37, 37)">
    <div id="notemail" style="color: rgb(255, 37, 37);">
      Email Inválido!
    </div>
    <div style="font-weight: bold;">
      CPF
    </div>
    <input id="cpf" onchange="allfilled(), filled('cpf')" type="text" placeholder="111.222.333-45" style="width: 100%; border: 1px solid rgb(255, 37, 37)">
    <div id="notcpf" style="color: rgb(255, 37, 37);">
      CPF Inválido!
    </div>
    <div style="font-weight: bold;">
      Número de Telefone
    </div>
    <input id="number" onchange="allfilled(), filled('number')" type="text" placeholder="+55 (11) 2233-4455" style="width: 100%; border: 1px solid rgb(255, 37, 37)">
    <div id="notnumber" style="color: rgb(255, 37, 37);">
      Numero de telefone Inválido!
    </div>
    <p>As suas informações pessoais serão utilizadas apenas pelo PicPay para processar o pagamento, A mitsy não ira salvar os seus dados pessoais.</p>
    <hr>
    <button id="botao" disabled="" onclick="botao()" class="button primary" style="width: 100%;">
      Continuar ao Pagamento
    </button>
    <div class="mb-8" />
  </div>
</template>
