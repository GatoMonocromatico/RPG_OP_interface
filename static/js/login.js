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
    let widthAtualizarDivCentralBorda = widthImagemSimboloMedo - 20

    divisoesLateraisDeBorda.css("width", widthAtualizarDivsLateraisBorda)
    divisaoCentralDeBorda.css("width", widthAtualizarDivCentralBorda)
    containerDivsDeBorda.css("margin-top", -heightForm - 2)
}

document.addEventListener("DOMContentLoaded", redimensionaElementos)

window.onresize = redimensionaElementos

const divInputsForm = $("#div_inputs_form")
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

btnTrocaSignInSignUp.on("click", () => {
    let modeloAtual = btnSubmit.attr("value")

    if (modeloAtual == "registrar") {
        btnSubmit.attr("value", "signin")
        $("#div_input_nome").remove()

        textJaTemUmaConta.html("Ainda não tem uma conta?")
        btnTrocaSignInSignUp.html("Registrar")
        btnSubmit.html("Sign in")

        btnSubmit.css("margin-top", "40px")
        imagemSimboloMedo.css("margin-bottom", "60px")
    } else {
        btnSubmit.attr("value", "registrar")
        divInputsForm.append(htmlInputNome)

        textJaTemUmaConta.html("Já tem uma conta?")
        btnTrocaSignInSignUp.html("Sign in")
        btnSubmit.html("Registrar")

        btnSubmit.css("margin-top", "20px")
        imagemSimboloMedo.css("margin-bottom", "20px")
    }
})

form.on("submit", (event) => {
    event.preventDefault()
})

