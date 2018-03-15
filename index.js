let store = {deliveries: [], meals: [], employers: [], customers: []}

let Customer =(function(){
  let id = 0
  return class{
    constructor(name, employer){
      this.name = name
      this.employer = employer
      this.id = ++id
      store.customers.push(this)
    }

    deliveries(){
      let custDeliveries = store.deliveries.slice()
      return custDeliveries.filter(delivery => delivery.customerId === this.id)
    }
    meals(){
      let deliveriesArr = [...this.deliveries()]
      return deliveriesArr.map(meal => meal.mealInstance)
    }

    totalSpent(){
      let allMeals = [...this.meals()]
      return allMeals.reduce((acc, curr)=> acc.price + curr.price)
    }
  }
})()

let Employer = (function(){

  let id = 0
  let all = []
  return class{
    constructor(name) {
      this.name = name
      this.id = ++id
      store.employers.push(this)
    }

    employees() {
      let allCustomers = store.customers.slice()
      return allCustomers.filter(customer => customer.employer.id === this.id)
    }

    deliveries() {

      let allEmployees = [...this.employees()];
       let arr = allEmployees.map(employee => employee.deliveries());
        return arr.reduce((a,b) => a.concat(b));
    }
    meals() {
      let deliveriesArr = [...this.deliveries()];
      let newArr = [];
      let allDelivs = deliveriesArr.map(meal => meal.mealInstance);
      allDelivs.forEach(function(element) {
        if(!newArr.includes(element)) {
          newArr.push(element)
        }
      })
      return newArr;
    }

    mealTotals() {
      let mealObj = {};
      let allMeals = this.deliveries().map(delivery => {
        return delivery.meal();
      })
      // allMeals => [{chick}, {chick}, {pasta}]
      // {
      //   chickenID aka 29: # of times its been ordered,
      //   pastaID aka 12: # of times its been ordered
      // }
      // allMeals.forEach(meal => {
      //   return mealObj[meal.id] = 0;
      // });
      // allMeals.forEach(meal => {
      //   return mealObj[meal.id] += 1;
      // })
      allMeals.forEach(meal => {
        if(!mealObj[meal.id]){
          mealObj[meal.id] =1
        }
        else{
          mealObj[meal.id]++
        }
      })
      return mealObj;
    }
  }
})()

let Delivery = (function(){

  let id = 0
  return class{
    constructor(meal, customer){
      this.customerInstance = customer
      this.mealInstance = meal
      this.id = ++id
      if(meal){
        this.mealId = meal.id
      }
      if(customer){
        this.customerId = customer.id
      }
      store.deliveries.push(this)
      // this.customerId = customer.id

      // store.meals.push(this.meal)
    }
    customer(){
      return this.customerInstance
    }

    meal(){
      return this.mealInstance
    }
  }

})()

let Meal = (function(){
  let id = 0;
  return class{
    constructor(title, price){
      this.title = title;
      this.price = price;
      this.id = ++id;
      store.meals.push(this);
    }

    deliveries(){
      let deliveriesArr = [...store.deliveries]
      return deliveriesArr.filter(delivery => delivery.mealId === id)
    }

    customers(){
      let allDeliveries = [...this.deliveries()]
      return allDeliveries.map(delivery => delivery.customerInstance)
    }

    static byPrice(){
      let sortedMeals = [...store.meals];
      return sortedMeals.sort(function(a,b){
        return b.price - a.price;
      })
    }
  }
})()
