const C_flag = document.querySelector("[data-cursor-flag]")


window.addEventListener("mousemove", function (e){
    
    const pozX = e.clientX
    const pozY = e.clientY

    C_flag.style.left = `${pozX}px`
    C_flag.style.top = `${pozY}px`

    C_flag.animate({
        left : `${pozX}px`,
        top : `${pozY}px`},
        { duration: 100, fill: "forwards"})
    
})
