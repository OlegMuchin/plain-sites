function createFooter(){
    const footer = document.createElement("footer")
    footer.className = "footer_part"
    document.body.append(footer)
    let div1 = document.createElement("div")
    div1.className = "copyright_part"
    footer.append(div1)
    let div2 = document.createElement("div")
    div2.className = "container"
    div1.append(div2)
    let div3 = document.createElement("div")
    div3.className = "row "
    div2.append(div3)
    let div4 = document.createElement("div")
    div4.className = "col-lg-12"
    div3.append(div4)
    let div5 = document.createElement("div")
    div5.className = "copyright_text"
    div4.append(div5)
    const P = document.createElement("P")
    P.innerHTML = `&copy;${new Date().getFullYear()}  Калужский техникум электронных приборов `
    div5.append(P)
}createFooter()