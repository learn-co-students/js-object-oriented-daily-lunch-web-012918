let store = {
  deliveries: [],
  meals: [],
  employers: [],
  customers: []

}


let Customer = (function () {
  let id = 0

  return class {
    constructor(name, employer){
      this.name = name
      this.employer = employer
      this.id = ++id
      store.customers.push(this)
    }

    totalSpent(){
      const customerDeliveries = store.deliveries.filter((delivery) => delivery.customer === this )
      const prices = customerDeliveries.map((obj) => obj.meal.price);
      const sum = prices.reduce((total, amount)=> total + amount);
      return sum
    }

    meals() {
      const meals = this.deliveries().map((obj) => obj.meal);
      return meals
    }

    deliveries(){
      const customerDeliveries = store.deliveries.filter((delivery) => delivery.customer === this )
      return customerDeliveries
    }
  }
})()


let Meal = (function () {
  let id = 0

  return class {
    constructor(title, price){
      this.title = title
      this.price = price
      this.id = ++id
      store.meals.push(this)
    }

    static byPrice(){
      const sortedMeals = store.meals.sort(function(a, b){
        return b.price - a.price
      });
      return sortedMeals
    }


    deliveries(){
      const mealDeliveries = store.deliveries.filter((delivery) => delivery.meal === this )
      return mealDeliveries
    }

    customers() {
      const customers = this.deliveries().map((obj) => obj.customer);
      return customers
    }



  }
})()


let Delivery = (function () {
  let id = 0

  return class {
    constructor(meal, customer){
      this.meal = meal
      this.customer = customer
      this.id = ++id
      store.deliveries.push(this)
    }


  }
})()


let Employer = (function () {
  let id = 0

  return class {
    constructor(name){
      this.name = name
      this.id = ++id
      store.employers.push(this)
    }

    employees(){
      const foundEmployees = store.customers.filter((customer) => customer.employer === this)
      return foundEmployees
    }

    deliveries(){
      const employerDeliveries = store.deliveries.filter((delivery) => this.employees().includes(delivery.customer))
      return employerDeliveries
    }

    meals(){
      const employerMeals = this.deliveries().map((obj) => obj.meal);
      // console.log(employerMeals)
      let unique_array = []
      for (let i = 0; i < employerMeals.length; i++) {
        if (unique_array.includes(employerMeals[i])) {
          continue
        } else {
          unique_array.push(employerMeals[i])
        }
      }
      return unique_array
    }

    mealTotals(){
      const employerMeals = this.deliveries().map((obj) => obj.meal);
      let obj = {}

      for (let i = 0; i < employerMeals.length; i++) {
        if (obj[employerMeals[i].id]) {
          obj[employerMeals[i].id] += 1
        } else {
          obj[employerMeals[i].id] = 1
        }
      }

      return obj
    }
  }
})()
