document.addEventListener("DOMContentLoaded", () => {
    // Seleção de elementos do DOM
    const likeBtn = document.querySelector(".like-btn");
    const likeSvg = likeBtn ? likeBtn.querySelector("svg") : null;
    const likesCountSpan = document.querySelector(".like-count");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");
    const totalLikesText = document.querySelector(".total-likes-text");

    // Estado inicial
    let baseLikes = 0;
    let isLiked = false;

    // Atualiza visualização inicial
    if (likesCountSpan) {
        likesCountSpan.textContent = "0";
    }

    // Função para formatar números acima de 1000 (Ex: 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Aplica o efeito visual de pulso (bounce) no coração
    function triggerHeartAnimation() {
        if (!likeSvg) return;
        likeSvg.style.transform = "scale(1.3)";
        setTimeout(() => {
            likeSvg.style.transform = "scale(1)";
        }, 150);
    }

    // Atualiza a interface (estilos e contadores)
    function updateLikesUI() {
        if (likesCountSpan) {
            likesCountSpan.textContent = formatLikes(baseLikes);
        }

        if (totalLikesText) {
            totalLikesText.textContent = `outras ${formatLikes(baseLikes)} pessoas`;
        }

        if (isLiked) {
            likeBtn.classList.add("liked");
        } else {
            likeBtn.classList.remove("liked");
        }
    }

    // Incrementa uma curtida
    function addLike() {
        if (!isLiked) {
            baseLikes++;
            isLiked = true;
            updateLikesUI();
        }
        triggerHeartAnimation();
    }

    // Remove a curtida
    function removeLike() {
        if (isLiked) {
            baseLikes = Math.max(0, baseLikes - 1);
            isLiked = false;
            updateLikesUI();
        }
    }

    // Evento de clique no BOTÃO DE CORAÇÃO (Alterna curtir/descurtir)
    if (likeBtn) {
        likeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isLiked) {
                removeLike();
            } else {
                addLike();
            }
        });
    }

    // Evento de clique na TELA/FOTO PRINCIPAL (Apenas curte)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }
});