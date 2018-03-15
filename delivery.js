const Delivery = ( function () {
  let counterId = 0

    return class Delivery {
      constructor(meal = {}, customer = {}) {
        this.mealId = meal.id
        this.customerId = customer.id
        this.id = ++counterId
        store.deliveries.push(this)
      }

      meal() {
        return store.meals.find((meal) => {
          return meal.id === this.mealId
        })
      }

      customer() {
        return store.customers.find((customer) => {
          return customer.id === this.customerId
        })
      }


    }
  }
)()
