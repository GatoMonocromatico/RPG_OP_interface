const seção_ficha = $("#ficha")
const puxador_ficha = $("#ficha_puxador")
const secao_atributos_imagem = $("#secao_atributos_ficha_atributos")

const secao_ficha_atributos = $("#secao_ficha_atributos")
const secao_ficha_habilidades = $("#secao_ficha_habilidades")
const secao_ficha_inventario = $("#secao_ficha_inventario")
const grid_secoes_ficha = $("#grid_secoes_ficha")

const label_atributos_barra_escolhe_secao_ficha = $("#opcao_barra_escolha_seçao_ficha_atributo")
const label_habilidades_barra_escolhe_secao_ficha = $("#opcao_barra_escolha_seçao_ficha_habilidades")
const label_inventario_barra_escolhe_secao_ficha = $("#opcao_barra_escolha_seçao_ficha_inventario")
const grid_demarcacao_barra_escolhe_secao_ficha = $("#div_demarcacao_escolha_barra_conteudo_ficha")
const demarcacao_barra_escolhe_secao_ficha = $("#demarcacao_escolha_barra_conteudo_ficha")

var conteudo_ficha_sendo_mostrado = "atributos"

const ficha_habilidades_labels_box = $(".label_habilidade_ficha_conteudo")

const select_categoria_pericias = $("#select_tipo_pericias")

const secao_pericias_ficha = $("#secao_pericias_ficha")

const apertou_puxador = (tipo_evento) => {
    const larguraTela = window.innerWidth;
    let offSet = parseInt(seção_ficha.css("width"))

    let mexeu, soltou

    if (tipo_evento == "mouse") {
        mexeu = "mousemove"
        soltou = "mouseup"    
    } else {
        mexeu = "touchmove"
        soltou = "touchend"
    }

    console.log(mexeu, soltou)

    function mexeu_puxador(e) {
        if (tipo_evento == "touch") {
            e = e.touches[0]
        }
        let x = e.clientX
        let x_processado

        if (x <= 10) {
            x_processado = 10 - offSet
        } else if (x >= offSet) {
            x_processado = 0
        } else if (x >= larguraTela) {
            x_processado = larguraTela - offSet
        } else {
            x_processado = e.clientX - offSet
        }
        seção_ficha.css("left", x_processado)
    }

    function soltou_puxador() {
        document.removeEventListener(mexeu, mexeu_puxador);
        document.removeEventListener(soltou, soltou_puxador);
        console.log("soltou")
    }

    document.addEventListener(mexeu, mexeu_puxador);
    document.addEventListener(soltou, soltou_puxador);    
}

document.addEventListener("DOMContentLoaded", () => {
    let largura_ficha = parseFloat(seção_ficha.css("width").replace("px", ""))
    let largura_secao_atributos_imagem = parseFloat(secao_atributos_imagem.css("width").replace("px", ""))

    seção_ficha.css("left", -(largura_ficha-10))
    secao_atributos_imagem.css("height", largura_secao_atributos_imagem)

    let largura_label_atributos_escolhe_secao = label_atributos_barra_escolhe_secao_ficha.css("width")
    let largura_label_habilidades_escolhe_secao = label_habilidades_barra_escolhe_secao_ficha.css("width")
    let largura_label_inventario_escolhe_secao = label_inventario_barra_escolhe_secao_ficha.css("width")
    let largura_enfeite_barra_escolhe_secao = $(".enfeite_entre_nomes_barra_conteudo_ficha").css("width")

    grid_demarcacao_barra_escolhe_secao_ficha.css("width", 20+parseFloat(largura_label_atributos_escolhe_secao.replace("px", "")) + parseFloat(largura_label_habilidades_escolhe_secao.replace("px", "")) + parseFloat(largura_label_inventario_escolhe_secao.replace("px", "")) + (parseFloat(largura_enfeite_barra_escolhe_secao.replace("px", "")) * 2))
    grid_demarcacao_barra_escolhe_secao_ficha.css("gap", 5)
    grid_demarcacao_barra_escolhe_secao_ficha.css("grid-template-columns", largura_label_atributos_escolhe_secao + " " + largura_enfeite_barra_escolhe_secao + " " + largura_label_habilidades_escolhe_secao + " " + largura_enfeite_barra_escolhe_secao + " " + largura_label_inventario_escolhe_secao)
    demarcacao_barra_escolhe_secao_ficha.css("grid-column", 1)
})

const mudar_conteudo_ficha = (conteudo_a_mostrar) => {
    if (conteudo_ficha_sendo_mostrado == "atributos") {
        secao_ficha_atributos.css("opacity", "0")
        secao_ficha_atributos.css("z-index", "0")
    }else if (conteudo_ficha_sendo_mostrado == "habilidades") {
        secao_ficha_habilidades.css("opacity", "0")
        secao_ficha_habilidades.css("z-index", "0")
    }else if (conteudo_ficha_sendo_mostrado == "inventario") {
        secao_ficha_inventario.css("opacity", "0")
        secao_ficha_inventario.css("z-index", "0")
    }

    if (conteudo_a_mostrar == "atributos") {
        secao_ficha_atributos.css("opacity", "100%")
        secao_ficha_atributos.css("z-index", "1")
        demarcacao_barra_escolhe_secao_ficha.css("grid-column", 1)
        
        secao_ficha_atributos.css("grid-row", 1)
        secao_ficha_habilidades.css("grid-row", 2)
        secao_ficha_inventario.css("grid-row", 3)
    }else if (conteudo_a_mostrar == "habilidades") {
        secao_ficha_habilidades.css("opacity", "100%")
        secao_ficha_habilidades.css("z-index", "1")
        demarcacao_barra_escolhe_secao_ficha.css("grid-column", 3)
        
        secao_ficha_atributos.css("grid-row", 2)
        secao_ficha_habilidades.css("grid-row", 1)
        secao_ficha_inventario.css("grid-row", 3)
    }else if (conteudo_a_mostrar == "inventario") {
        secao_ficha_inventario.css("opacity", "100%")
        secao_ficha_inventario.css("z-index", "1")
        demarcacao_barra_escolhe_secao_ficha.css("grid-column", 5)
        
        secao_ficha_atributos.css("grid-row", 3)
        secao_ficha_habilidades.css("grid-row", 2)
        secao_ficha_inventario.css("grid-row", 1)
    }

    conteudo_ficha_sendo_mostrado = conteudo_a_mostrar
}

label_atributos_barra_escolhe_secao_ficha.on("click", function () {mudar_conteudo_ficha("atributos")})
label_atributos_barra_escolhe_secao_ficha.on("touchend", function () {mudar_conteudo_ficha("atributos")})
label_habilidades_barra_escolhe_secao_ficha.on("click", function () {mudar_conteudo_ficha("habilidades")})
label_habilidades_barra_escolhe_secao_ficha.on("touchend", function () {mudar_conteudo_ficha("habilidades")})
label_inventario_barra_escolhe_secao_ficha.on("click", function () {mudar_conteudo_ficha("inventario")})
label_inventario_barra_escolhe_secao_ficha.on("touchend", function () {mudar_conteudo_ficha("inventario")})

puxador_ficha.on("mousedown", function () {apertou_puxador("mouse")})
puxador_ficha.on("touchstart", function () {apertou_puxador("touch")})

const sleep = ms => new Promise(r => setTimeout(r, ms))

ficha_habilidades_labels_box.on("click", function () {
    let detalhes = $(this).siblings(".detalhes_habilidade_ficha")
    let simbolo = $(this).children(".icone_seta_label_ficha")

    console.log(simbolo)

    if (detalhes.hasClass("active")) {
        detalhes.removeClass("active");
        simbolo.css("transform", "rotate(0deg)")
    } else {
        detalhes.addClass("active");
        simbolo.css("transform", "rotate(180deg)")
    }
})

select_categoria_pericias.on("change", function () {
    $(".div_pericia_ficha_conteudo").remove()

    let categoria = select_categoria_pericias.val()

    let pericias = {
        "Percepção": "nt",
        "Luta": "t",
        "Investigação": "v",
        "Fortitude": "e",
    }

    let dicio_bonus_treinamento = {
        "nt": "+0",
        "t": "+5",
        "v": "+10",
        "e": "+15"
    }
    
    let HTML_pericias = `
        <div class="div_pericia_ficha_conteudo">
            <span class="nome_pericia_ficha_conteudo">NOMEPERICIA</span>
            <span class="nivel_pericia_ficha_conteudo">BONUSPORTREINAMENTO</span>
        </div>`

    for (pericia in pericias) {
        let nivel_treinamento = pericias[pericia]

        if (categoria != "todas") {
            if (nivel_treinamento == categoria) {
                nivel_treinamento = dicio_bonus_treinamento[nivel_treinamento]

                let HTML_pericia = HTML_pericias.replace("NOMEPERICIA", pericia).replace("BONUSPORTREINAMENTO", nivel_treinamento)

                secao_pericias_ficha.append(HTML_pericia)
            }
        } else {
            nivel_treinamento = dicio_bonus_treinamento[nivel_treinamento]

            let HTML_pericia = HTML_pericias.replace("NOMEPERICIA", pericia).replace("BONUSPORTREINAMENTO", nivel_treinamento)

            secao_pericias_ficha.append(HTML_pericia)
        }
        
    }
})
