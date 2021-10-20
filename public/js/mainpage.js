
function mostrar(shown, hidden) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
}
  
  function botao() {
      const nome = document.getElementById("nome").value
      const sobrenome = document.getElementById("sobrenome").value
      const email = document.getElementById("email").value
      const cpf = document.getElementById("cpf").value
      const numero = document.getElementById("number").value
    console.log(nome+sobrenome+email+cpf+numero)
  }
  
  function allfilled(){
      if(document.getElementById('nome').value.length == !0 && document.getElementById('sobrenome').value.length == !0 && document.getElementById('email').value.length == !0 && document.getElementById('cpf').value.length == !0 && document.getElementById('number').value.length == !0){
      document.getElementById('botao').disabled = false;
      }
  }
  
  function filled(id) {
      if(document.getElementById(id).value.length == 0)
  {
      document.getElementById("not"+id).style.display='block';
      document.getElementById(id).style.border='1px solid rgb(250, 109, 109)';
  } else {
      document.getElementById("not"+id).style.display='none';
      document.getElementById(id).style.border='1px solid';
  }
}