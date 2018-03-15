let deliveryId = 0
let mealId = 0
let employerId = 0
let customerId = 0
let store = {
  deliveries: [],
  meals: [],
  customers: [],
  employers: []
}
class Delivery {
  constructor(meal={} , customer={}){
    this.id = ++deliveryId;
    this.mealInstance = meal;
    this.mealId = meal.id;
    this.customerInstance = customer;
    this.customerId = customer.id;
    store.deliveries.push(this);
  }
  customer(){
    return this.customerInstance;
  }
  meal(){
    return this.mealInstance;
  }
}
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  static byPrice () {
    return store.meals.sort(function(a, b){
      return b.price - a.price;
    });
  }
  deliveries(){
    return store.deliveries;
    //Matt and Laura, should we iterate and add a conditional?
  }
  customers(){
    return store.customers;
    //Same question as line 46
  }
}
class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }
  employees() {
    let employeeList = []
    for (const employee of store.customers) {
      if (this.id === employee.employer.id) {
        employeeList.push(employee)
      }
    }
    return employeeList
  }
  deliveries() {
    const employeeList = this.employees()
    const deliveryList = store.deliveries
    let employeeIdList = [];
    let result = [];
    for(const employee of employeeList){
      employeeIdList.push(employee.id)
    }
    for(const delivery of deliveryList){
      if (employeeIdList.includes(delivery.customerId)){
        result.push(delivery);
      }
    }
    return result
  }
  meals() {
    let deliveryList = this.deliveries()
    let mealIdWithDuplicates = deliveryList.map(delivery => delivery.mealId)
    let uniqueIds = []
    for (const mealId of mealIdWithDuplicates) {
      if (!uniqueIds.includes(mealId)) {
        uniqueIds.push(mealId)
      }
    }
    let results = []
    for (const meal of store.meals) {
      if (uniqueIds.includes(meal.id)) {
        results.push(meal)
      }
    }
    return results
  }
  mealTotals(){
    let deliveryList = this.deliveries()
    let mealInstances = deliveryList.map(delivery => delivery.mealInstance)
    console.log(mealInstances)
    let mealCount = {}
    for (const meal of mealInstances) {
      let mealId = meal.id
      if (mealCount[mealId] !== undefined) {
        console.log(mealCount[mealId])
        mealCount[mealId] += 1
      } else {
        mealCount[mealId] = 1
      }
    }
    console.log(mealCount)
    return mealCount
  }
}
class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    this.employer = employer
    store.customers.push(this)
  }
  totalSpent (){
    //counter
    //look thru deliveries finding customers deliveries
    // going thru each matching deliverys meal and adding the price
    //return counter
    let counter = 0;
    let customerDeliveries = [];
      for(const delivery of store.deliveries){
        if(this.id === delivery.customerId){
          customerDeliveries.push(delivery.mealInstance);
        }
      }
      for(const meal of customerDeliveries){
        counter += meal.price;
      }
    return counter;
  }
  deliveries (){
    return store.deliveries
  }
  meals () {
    return store.meals
  }
}
