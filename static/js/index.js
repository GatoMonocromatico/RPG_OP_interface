const fecharContainerEntrarSessao = $("#icone_x_barra_entrar_sessao")
const fecharContainerCriarSessao = $("#icone_x_barra_criar_sessao")

const containerCriarSessao = $("#container_criar_sessão")
const btnAbrirCriarSessao = $("#btn_abrir_criar_sessao")

const containerEntrarSessao = $(".container_entrar_sessao")
const btnAbrirEntrarSessao = $("#btn_abrir_entrar_sessao")

const containerTelaPrincipal = $(".container_tela_principal")

const inputColorPickerCriarSessao = $("#input_color_criar_sessao")
const inputTextHexCriarSessao = $("#input_hex_code_criar_sessao")

const inpFotoCriarSessao = $("#image_input_criar_sessao_real")
const imagemCriarSessao = $("#imagem_sessao_criar_sessao")

const sleep = ms => new Promise(r => setTimeout(r, ms))

fecharContainerEntrarSessao.on("click", async () => {
    containerEntrarSessao.css("opacity", "0")
    containerTelaPrincipal.css("filter", "grayscale(0%)")
    
    await sleep(100)
    containerEntrarSessao.css("z-index", "1")
    containerTelaPrincipal.css("z-index", "2")
})

btnAbrirEntrarSessao.on("click", async () => {
    containerEntrarSessao.css("z-index", "2")
    containerTelaPrincipal.css("z-index", "1")

    await sleep(1)
    containerEntrarSessao.css("opacity", "100%")
    containerTelaPrincipal.css("filter", "grayscale(50%)")
})

fecharContainerCriarSessao.on("click", async () => {
    containerCriarSessao.css("opacity", "0")
    containerTelaPrincipal.css("filter", "grayscale(0%)")
    
    await sleep(100)
    containerCriarSessao.css("z-index", "1")
    containerTelaPrincipal.css("z-index", "2")
})

btnAbrirCriarSessao.on("click", async () => {
    containerCriarSessao.css("z-index", "2")
    containerTelaPrincipal.css("z-index", "1")

    await sleep(1)
    containerCriarSessao.css("opacity", "100%")
    containerTelaPrincipal.css("filter", "grayscale(50%)")
})

inputColorPickerCriarSessao.on("change", function (event) {
    inputTextHexCriarSessao.val(event.target.value)
    inputTextHexCriarSessao.css("color", event.target.value)
})

inputTextHexCriarSessao.on("change", function (event) {
    inputColorPickerCriarSessao.val(event.target.value)
    inputTextHexCriarSessao.css("color", event.target.value)
})

inpFotoCriarSessao.on("change", () => {
    const file = inpFotoCriarSessao[0].files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemCriarSessao.attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }
})
