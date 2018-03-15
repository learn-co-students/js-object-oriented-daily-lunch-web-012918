let store = {
  meals: [],
  customers: [],
  deliveries: [],
  employers: []
}


let Customer = (function() {
  let id = 0

  return class Customer {
    constructor(name, employerId = {}) {
      this.name = name
      this.employerId = employerId
      this.id = ++id
      store.customers.push(this)
      }

    totalSpent () {
      return this.meals().reduce((total, meal) => (total + meal.price), 0)
    }

    deliveries () {
      return store.deliveries.filter(delivery => delivery.customerId == this.id)
    }

    meals () {
      let meals = []
      for(let delivery of this.deliveries()) {
        let foundMeal = store.meals.find(meal => meal.id == delivery.mealId)
        meals.push(foundMeal)
      }
      return meals
      }
    }
})()


let Meal = (function() {
  let id = 0

  return class Meal {
    constructor(title, price) {
      this.title = title
      this.price = price
      this.id = ++id
      store.meals.push(this)
      }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price
    })
  }

  deliveries () {
    return store.deliveries.filter(delivery => delivery.mealId == this.id )
  }

  customers () {
    let customers = []
    for(let delivery of this.deliveries()) {
      let foundCustomer = store.customers.find(customer => customer.id == delivery.customerId)
      customers.push(foundCustomer)
    }
    return customers
  }
}

})()


let Delivery = (function() {
  let id = 0

  return class Delivery {
    constructor(meal = {}, customerId = {}) {
      this.mealId = meal.id
      this.customerId = customerId.id
      this.id = ++id
      store.deliveries.push(this)
      }

    customer () {
      return store.customers.find(customer => customer.id === this.customerId)
    }

    meal () {
      return store.meals.find(meal => meal.id === this.mealId)
    }
    }
})()


let Employer = (function() {
  let id = 0

  return class Employer {
    constructor(name) {
      this.name = name
      this.id = ++id
      store.employers.push(this)
      }

      employees () {
        return store.customers.filter(customer => customer.employerId == this)
      }

      deliveries () {
        let deliveries = []
        this.employees().forEach(function(employee) {
          employee.deliveries().forEach(delivery => deliveries.push(delivery))
        })
        return deliveries
      }

      meals () {
        let meals = []
        this.employees().forEach(function(employee) {
          employee.meals().forEach(meal => meals.push(meal))
        })
        return [...new Set(meals)]
      }

      mealTotals () {
        let meals = {}
        this.employees().forEach(function(employee) {
          employee.meals().forEach(function (meal) {
            meals[meal.id] ? meals[meal.id] += 1 : meals[meal.id] = 1
          })
        })
        return meals
      }
    }
})()
