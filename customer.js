const Customer = ( function () {
  let counterId = 0

    return class Customer {
      constructor(name, employer={}) {
        this.employerId = employer.id
        this.name = name
        this.id = ++counterId
        store.customers.push(this)
      }

      deliveries() {
        const myDeliveries = store.deliveries.filter((delivery) => {
          return delivery.customerId === this.id
        }); return myDeliveries
      }

      meals(){
        const myDeliveries = this.deliveries()
        const myMeals = myDeliveries.map((delivery) => {
          return delivery.meal()
        }); return myMeals
      }

      totalSpent() {
        return this.meals().reduce((acc, meal) => {
          return acc + meal.price
        },0)
      }

    }
  }
)()
