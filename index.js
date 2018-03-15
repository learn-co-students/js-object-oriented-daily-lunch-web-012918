let mealId = 0
let customerId = 0
let deliveryId = 0
let employerId = 0
let store = {
  meals: [],
  customers: [],
  deliveries: [],
  employers: []
}

class Delivery {

  constructor(meal, customer) {
    this.id = ++deliveryId
    this.mealId = (meal ? meal.id : 0)
    this.customerId = (customer ? customer.id : 0)
    store.deliveries.push(this)
  }

  meal() {
    for (let i = 0; i < store.meals.length; i++) {
      let meal = store.meals[i];

      if (meal.id === this.mealId) {
        return meal;
      }
    }
  }

  customer() {
    for (let i = 0; i < store.customers.length; i++) {
      let customer = store.customers[i];

      if (customer.id === this.customerId) {
        return customer;
      }
    }
  }

}

class Customer {

  constructor(name, employer) {
    this.name = name
    this.id = ++customerId
    this.employerId = (employer ? employer.id : 0)
    store.customers.push(this)

  }

  meals() {
    let arr = []
    let filteredDelivs = store.deliveries.filter( delivery => {return delivery.customerId === this.id})

    for (let delivs of filteredDelivs) {
      for(let meal of store.meals) {
        if (meal.id === delivs.mealId) {
          arr.push(meal)
        }
      }
    }
    return arr;
  }

  deliveries() {
    let filteredDelivs = store.deliveries.filter( delivery => {return delivery.customerId === this.id})
    return filteredDelivs;
  }

  totalSpent() {
    let meals = this.meals()

    return meals.reduce((total, x) => {return total += x.price}, 0)

  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    let filteredDelivs = store.deliveries.filter( delivery => {return delivery.mealId === this.id})
    return filteredDelivs;
  }

  customers() {
    let arr = []
    let filteredDelivs = store.deliveries.filter( delivery => {return delivery.mealId === this.id})

    for (let delivs of filteredDelivs) {
      for(let customer of store.customers) {
        if (customer.id === delivs.customerId) {
          arr.push(customer)
        }
      }
    }
    return arr;
  }

  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal2.price - meal1.price
    })
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {return customer.employerId === this.id})
  }

  deliveries() {
    let employees = this.employees()

    return employees.reduce((agg, customer) => {return agg.concat(customer.deliveries())}, [])

    let filteredDelivs = store.deliveries.filter( delivery => {return delivery.customerId === this.id})
    return filteredDelivs;
  }

  meals() {
    let arr = []

    for (let delivs of this.deliveries()) {
      for(let meal of store.meals) {
        if (meal.id === delivs.mealId) {
          arr.push(meal)
        }
      }
    }
    let unique = arr.filter((v, i, a) => a.indexOf(v) === i);
    return unique;
  }

  mealTotals() {
    let arr = []

    for (let delivs of this.deliveries()) {
      for(let meal of store.meals) {
        if (meal.id === delivs.mealId) {
          arr.push(meal)
        }
      }
    }

    let obj = {}

    for(let meal of arr) {
      if(obj[meal.id]) {
        obj[meal.id] += 1;
      } else {
        obj[meal.id] = 1
      }
    }
    return obj;
  }

}
