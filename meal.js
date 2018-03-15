const Meal = ( function () {
  let counterId = 0

    return class Meal {
      constructor(title, price) {
        this.title = title
        this.price = price
        this.id = ++counterId
        store.meals.push(this)
      }

      deliveries() {
        const myDeliveries = store.deliveries.filter((delivery) => {
          return delivery.mealId === this.id
        })
        return myDeliveries
      }

      customers() {
        const myDeliveries = this.deliveries()
        return myDeliveries.map((delivery) => {
          return delivery.customer()
        })
      }

      static byPrice() {

        const sortedMeals = store.meals.sort((a, b) => {
          return b.price - a.price
        })
        return sortedMeals
      }
    }


  }
)()
