let customerId = 0
let mealId = 0
let employerId = 0
let deliveryId = 0

let store = {
  deliveries: [],
  customers: [],
  meals: [],
  employers: []
}
class Customer{
  constructor(name, employer){
    this.name = name
    this.employer = employer
    this.id = ++customerId
    store.customers.push(this)
  }

  totalSpent(){
    return store.deliveries.filter((delivery)=>{
      return delivery.customerId === this.id
    }).reduce(function(acc, delivery){
      return acc + delivery.meal().price
    }, 0)
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id
    })
  }

  meals(){
    let dels = store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id
    })
    let ids = dels.map(function(delivery){
      return delivery.mealId
    })
    return store.meals.filter( meal =>{
      return ids.includes(meal.id)
    })
  }

}

class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price
    })
  }

  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.mealId === this.id
    }.bind(this))
  }

  customers(){
    let dels = store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id
    })
    let ids = dels.map(function(delivery){
      return delivery.customerId
    })
    return store.customers.filter( customer =>{
      return ids.includes(customer.id)
    })

  }

}

class Delivery{
  constructor(meal={}, customer={}){
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal =>{
      return meal.id === this.mealId
    })
  }

  customer(){
    return store.customers.find(customer =>{
      return customer.id === this.customerId
    })
  }



}

class Employer{
  constructor(name){
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter(customer => {
      return customer.employer.id === this.id
    })
  }
  deliveries(){
    let customers = this.employees()
    let deliveries = customers.map(customer => {
      return customer.deliveries()
    })
    return deliveries[0].concat(deliveries[1])
  }
  meals(){
    let customers = this.employees()
    let meals = customers.map(customer => {
      return customer.meals()
    })
    meals = meals[0].concat(meals[1])
    let me = []
    for(let i = 0; i < meals.length; i++){
      if (!me.includes(meals[i])){
        me.push(meals[i])
      }
    }
    return me
  }
  mealTotals(){
    let meals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    return meals.reduce(function(mealAcc, meal){
      if(!mealAcc[meal.id]){
        mealAcc[meal.id] = 1
      }else{
        mealAcc[meal.id]++
      }
      return mealAcc
    }, {})
  }
}
