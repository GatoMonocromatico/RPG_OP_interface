const divisaoLateralDeBorda1 = $("#borda_lateral_1")
const divisaoLateralDeBorda2 = $("#borda_lateral_2")

const containerDivsDeBorda = $("#fantasma_form")
const imagemSimboloMedo = $("#simbolo_medo")
const divisoesLateraisDeBorda = $(".borda_laterais")
const divisaoCentralDeBorda = $("#borda_up_bottom")
const form = $("#myform")

const redimensionaElementos = () => {
    let widthForm = parseFloat(form.css("width"))
    let heightForm = parseFloat(form.css("height"))

    let widthImagemSimboloMedo = parseFloat(imagemSimboloMedo.css("width"))

    let widthAtualizarDivsLateraisBorda = (widthForm / 2) - (- 10 + (widthImagemSimboloMedo / 2)) + 2
    let widthAtualizarDivCentralBorda = widthImagemSimboloMedo + 4  

    divisoesLateraisDeBorda.css("width", widthAtualizarDivsLateraisBorda)
    divisaoCentralDeBorda.css("width", widthAtualizarDivCentralBorda)
    containerDivsDeBorda.css("margin-top", -heightForm - 2)
}

document.addEventListener("DOMContentLoaded", redimensionaElementos)

window.onresize = redimensionaElementos

const divInputsForm = $("#div_inputs_form")
const containerInputsSenha = $("#container_inputs_senha")
const btnSubmit = $("#submit")
const btnTrocaSignInSignUp = $("#troca_sign_in_sign_up")
const textJaTemUmaConta = $("#ja_tem_uma_conta")
const htmlInputNome = `
<div class="div_input_form" id="div_input_nome">
    <div class="icon_area">
        <i class="icon fa-solid fa-user fa"></i>
    </div>
    <input class="input_form" id="nome" type="text" placeholder="Nome" required>
</div>`

const HTMLInputConfimaSenha = `<input class="input_form" id="confirma_senha" type="password" placeholder="Confirme Sua Senha" minlength="6" required>`

var modeloAtual = "registrar"

btnTrocaSignInSignUp.on("click", () => {
    modeloAtual = btnSubmit.attr("value")

    if (modeloAtual == "registrar") {
        modeloAtual = "signin"

        btnSubmit.attr("value", "signin")
        $("#div_input_nome").remove()

        textJaTemUmaConta.html("Ainda não tem uma conta?")
        btnTrocaSignInSignUp.html("Registrar")
        btnSubmit.html("Sign in")
        
        btnSubmit.css("margin-top", "77px")
        imagemSimboloMedo.css("margin-bottom", "53px")

        $("#confirma_senha").remove()
        $("#icon_area_senha").css("height", "40")
        inputSenha.css("border-radius", "0 50px 50px 0")
        inputSenha.css("border-bottom", "none")
    } else {
        modeloAtual = "registrar"  

        btnSubmit.attr("value", "registrar")
        divInputsForm.append(htmlInputNome)

        textJaTemUmaConta.html("Já tem uma conta?")
        btnTrocaSignInSignUp.html("Sign in")
        btnSubmit.html("Registrar")

        btnSubmit.css("margin-top", "10px")
        imagemSimboloMedo.css("margin-bottom", "20px")

        containerInputsSenha.append(HTMLInputConfimaSenha)
        $("#icon_area_senha").css("height", "80")
        inputSenha.css("border-radius", "0 20px 0 0")
        inputSenha.css("border-bottom", "1px solid var(--escuro_leve)")
        $("#confirma_senha").css("border-radius", "0 0 20px 0")
    }
})

const inputEmail = $("#email")
const inputSenha = $("#senha")

form.on("submit", (event) => {
    event.preventDefault()

    let validado = true
    let dados = new FormData()
    dados.set("modalidade", modeloAtual)
    dados.set("email", inputEmail.val())
    dados.set("senha", inputSenha.val())
    
    if (modeloAtual == "registrar") {
        dados.set("nome", $("#nome").val())
        validado = inputSenha.val() == $("#confirma_senha").val()
    }

    if (validado) {
        $.ajax({
            url: "/auth/login",
            Headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "post",
            contentType: false,
            cache: false,
            processData: false,
            data: dados,
            success: function (data) {
                console.log(data)
                window.location.href = "/"
            },
            error: function (erro) {
                console.log("erro" + erro)
            }
        })
    } else {
        alert("Suas senhas não coincidem")
    }
    
})

