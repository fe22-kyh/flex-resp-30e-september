const data = async () => {
  let template
  let pizzas
  await Promise.all([
    await fetch('./template/pizzaCard.html'),
    await fetch('./assets/data/pizzas.json'),
  ]).then(async (responses) => {
    template = await responses[0].text()
    pizzas = await responses[1].json()
  })

  return {
    template: template,
    pizzas: pizzas,
  }
}

const loadPizzas = (async () => {
  const domParser = new DOMParser()
  const pizzaContainer = document.querySelector('.pizza-section .container')
  const { template, pizzas } = await data()

  pizzas.forEach((pizza) => {
    let pizzaCard = template.slice()
    pizzaCard = pizzaCard
      .replace('{{pizza-name}}', pizza.name)
      .replace('{{pizza-text}}', pizza.text)
      .replace('{{pizza-image}}', `assets/image/${pizza.image}`)
      .replace('{{pizza-alt}}', 'Picture of ' + pizza.name)

    let pizzaDoc = domParser.parseFromString(pizzaCard, 'text/html')
    let element = pizzaDoc.documentElement.querySelector('.card')

    //element.style.backgroundImage = `url(./assets/image/${pizza.image})`
    pizzaContainer.append(element)
  })
})()
