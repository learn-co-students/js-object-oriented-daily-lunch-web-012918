let store = {}
store.deliveries = []
store.meals = []
store.employers = []
store.customers = []

let Customer = (function() {
  let id = 0;
  return class  {
    constructor(name, employer) {
      this.name = name
      this.employer = employer
      // this.employerId = employer.id
      this.id = ++id
      store.customers.push(this)
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.customerId === this.id;
      });
    }

    meals() {
      return this.deliveries().map(delivery => {
        return delivery.meal();
      });
    }

    totalSpent() {
      return this.meals().reduce(function(sum, meal) {
        return sum + meal.price;
      }, 0);
    }
  }
})()


let Meal = (function() {
  let id = 0;
  return class {
    constructor(title, price) {
      this.title = title
      this.price = price
      this.id = ++id
      store.meals.push(this)
    }

    static byPrice() {
      let orderedMeals = store.meals.slice();
      return orderedMeals.sort(function(a, b) {
        // return a.price < b.price
        return b.price - a.price;
      })
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.mealId === this.id;
      });
    }

    customers() {
      let deliveryArr = this.deliveries();
      return deliveryArr.map(delivery => {
        return store.customers.find(cust => cust.id === delivery.id)
      })

    }
  }
})();

let Delivery = (function() {
  let id = 0;
  return class {
    constructor(meal = {}, customer = {}) {
      this.customerId = customer.id
      this.mealId = meal.id
      this.id = ++id
      store.deliveries.push(this)
    }

    customer() {
      // return this.something;
      return store.customers.find(customer => {
        return customer.id === this.customerId;
      });
    }

    meal() {
      return store.meals.find(meal => {
        return meal.id === this.mealId;
      });
    }
  }
  })()

  let Employer = (function() {
    let id = 0;
    return class {
      constructor(name) {
        this.name = name
        this.id = ++id
        store.employers.push(this)
      }

      employees() {
        return store.customers.filter(customer => {
          return customer.employer.id === this.id
        })
      }

      deliveries() {
        let employeesArr = this.employees();
        return employeesArr.map(employee => {
          return store.deliveries.find(delivery => delivery.id === employee.id)
        })
      }

      meals() {
        let deliveriesArr = this.deliveries();
        let mealsReturn = deliveriesArr.map(delivery => {
          return store.meals.find(meal => meal.id === delivery.mealId)
        })
        return [...new Set(mealsReturn)]
      }

      mealTotals() {
        // let mealsArr = this.meals();
        // let deliveriesArr = this.deliveries();
        let mealTotals = {}
        store.deliveries.forEach(delivery => {
          mealTotals[delivery.mealId] ? mealTotals[delivery.mealId] += 1 : mealTotals[delivery.mealId] = 1
        });
        // console.log(mealsArr)
        // console.log(deliveriesArr)
        console.log(store.deliveries)
        console.log(mealTotals)
        return mealTotals
      }

    }
  })()
