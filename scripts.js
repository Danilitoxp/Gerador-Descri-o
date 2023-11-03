document.addEventListener("DOMContentLoaded", function() {
    const generateDescriptionButton = document.getElementById("generateDescriptionButton");
    const copyDescriptionButton = document.getElementById("copyButton"); // Corrigido o ID
    const productCodeInput = document.getElementById("productCode");
    const productDescription = document.getElementById("productDescription");

    function removeExcessSpaces(inputText) {
        return inputText.replace(/\s+/g, ' ');
    }

    generateDescriptionButton.addEventListener("click", function() {
        const code = removeExcessSpaces(productCodeInput.value);

        if (code.trim() === "") {
            showNotification("código Inválido!");
        } else {
            const description = generateProductDescription(code);
            productDescription.innerHTML = description;
            document.querySelector(".copiar").style.display = "flex";
        }
    });
    

    copyDescriptionButton.addEventListener("click", function() {
        const descriptionText = productDescription.innerText;
        copyToClipboard(descriptionText);
        document.querySelector(".copiar").style.display = "none"
    });

    function generateProductDescription(code) {
        const parts = code.split(" ");
        const title = parts.slice(0, parts.length - 4).join(" ");
        const yearRange = parts.slice(parts.length - 4, parts.length - 1).join(" ");
        const sizes = parts[parts.length - 1].split(",");
        
        const sizeDriver = sizes[0].trim();
        const sizePassenger = sizes[1].trim();
    
        const compatibleYears = generateCompatibleYears(title, yearRange);

        const description = `Par Palheta Limpador Para Brisa ${title} Silicone<br><br>
            Nossas Palhetas, além de contar com haste flexível e corpo todo emborrachado, o que impede impactos que possam vir a ocorrer com o vidro, essas palhetas de para-brisa oferecem uma instalação rápida e segura para veículos com encaixe tipo Gancho.<br><br>
            Tipo do encaixe:<br>Gancho<br><br>
            Conteúdo da Embalagem:<br><br>
            - 01 Palheta ${sizeDriver} Polegadas Lado Motorista<br>
            - 01 Palheta ${sizePassenger} Polegadas Lado Passageiro<br><br>
            Valor do Par<br><br>
            Compatível com:<br><br>${compatibleYears}<br><br>
            Especificações Técnicas:<br><br>
            - Em Plástico Maleável<br>
            - Sem Partes Metálicas Expostas<br>
            - Revestimento em Borracha que Reduz a Fricção com o Vidro<br>
            - Limpeza Silenciosa<br>
            - Adaptador Pré-Montado para Uma Fácil Instalação<br>
            - Resiste às Mais Diversas Condições Climáticas<br>
            - Longa Vida<br>
            - Para Veículos com Braço Tipo Gancho<br>
            - Substitui a Palheta Convencional<br>
            - Instalação Rápida e Segura<br><br>
            Importante:<br><br>
            Garantia de 30 Dias.`;

        return description;
    }

    function generateCompatibleYears(title, yearRange) {
        const [startYear, endYear] = yearRange.split(" a ");
        const yearList = [];

        for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
            yearList.push(`${title} ${year}`);
        }

        return yearList.join("<br>");
    }

    function copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    copyDescriptionButton.addEventListener("click", function() {
        const descriptionText = productDescription.innerText;
        copyToClipboard(descriptionText);
    
        productCodeInput.value = "";
    
        productDescription.innerHTML = "";
    
        showNotification("Copiada com Sucesso!");
    });
    

    function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.style.opacity = 1;
        notification.classList.remove("hidden");
    
        setTimeout(function() {
            notification.style.opacity = 0;
            setTimeout(function() {
                notification.classList.add("hidden");
            }, 1000);
        }, 700);
    }
    
});