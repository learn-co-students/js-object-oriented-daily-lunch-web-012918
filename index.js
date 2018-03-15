let store = {deliveries:[], meals:[], customers:[], employers:[]}
let Customer = (() => {
  let id = 1;
  return class Customer {
    constructor(name, employer ={}){
      this.name = name ;
      this.employerId= employer.id ;
      this.id = id++;
      store.customers.push(this)
    }
    meals(){
      let deliveries = [];
      for(let del of store.deliveries){
        if (del.customerId === this.id){
          deliveries.push(del)
        }
      }
      let meals = [];
      for(let meal of store.meals){
        for(let del of deliveries){
          if(del.mealId === meal.id){
            meals.push(meal);
          }
        }
      }
      return meals;
    }
    totalSpent() {
      return this.meals().reduce((acc, meal, i, meals) => {
        return acc + meal.price
      }, 0)
    }
    deliveries() {
      let deliveries = []
      for(let delivery of store.deliveries) {
        if(delivery.customerId === this.id){
          deliveries.push(delivery)
        }
      }
      return deliveries
    }
  }
})()
let Meal = (() => {
  let id=1;
  return class Meal {
    constructor(title, price){
      this.title = title
      this.price = price
      this.id = id++
      store.meals.push(this)
    }
    static byPrice() {
      store.meals.sort((a,b) => {
        return b.price - a.price
      })
      return store.meals
    }
    deliveries() {
      let deliveries = [];
      for(let del of store.deliveries){
        if (del.mealId === this.id){
          deliveries.push(del)
        }
      }
      return deliveries
    }
    customers() {
      let customers = []
      let customerIds = this.deliveries().map((delivery) => {
        return delivery.customerId
      })
      for(let customerId of customerIds){
        customers.push(store.customers.find((customer) => {
          return customer.id === customerId
        }))
      }
      return customers
    }
  }
})()
let Delivery = (() => {
  let id=1;
  return class Delivery {
    constructor(meal={}, customer={}) {
      this.mealId = meal.id ;
      this.customerId = customer.id ;
      this.id = id++;
      store.deliveries.push(this)
    }
    customer() {
      return store.customers.find((customer) => {
        return customer.id === this.customerId
      })
    }
    meal() {
      return store.meals.find((meal) => {
        return meal.id === this.mealId
      })
    }
  }
})()
let Employer = (() => {
  let id =1;
  return class Employer {
    constructor(name){
      this.name=name
      this.id=id++
      store.employers.push(this)
    }
    employees() {
      let employees = []
      for(let employee of store.customers){
        if(employee.employerId === this.id){
          employees.push(employee)
        }
      }
      return employees
    }
    deliveries() {
      let deliveries = []
      for(let employee of this.employees()){
        for(let delivery of store.deliveries){
          if(delivery.customerId === employee.id){
            deliveries.push(delivery)
          }
        }
      }
      return deliveries
    }
    meals() {
      let mealids = []
      let meals = []
      for(let delivery of this.deliveries()){
        if(!mealids.includes(delivery.mealId)){
          mealids.push(delivery.mealId)
        }
      }
      for(let mealId of mealids){
        meals.push(store.meals.find((meal) => {
        return meal.id === mealId
        }))
      }
      return meals
    }
    mealTotals() {
      let employerstats = {}
      for(let delivery of this.deliveries()){
        if(employerstats[delivery.mealId]){
          employerstats[delivery.mealId] ++
        } else {
          employerstats[delivery.mealId] = 1
        }
      }
      return employerstats
    }
  }
})()
