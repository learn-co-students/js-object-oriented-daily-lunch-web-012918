const Employer = ( function () {
  let counterId = 0

    return class Employer {
      constructor(name) {
        this.name = name
        this.id = ++counterId
        store.employers.push(this)
      }

      employees() {
        return store.customers.filter((customer) => {
          return customer.employerId === this.id
        })
      }

      deliveries() {
        const myEmployees = this.employees()
        const myDeliveries = []
        myEmployees.forEach((employee) => {
          const deliveries = employee.deliveries()
            for (const i of deliveries) {
              myDeliveries.push(i)
            }
        })
        return myDeliveries
      }

      meals() {
        const myDeliveries = this.deliveries()
        const myMeals = new Set(myDeliveries.map((deliv) => {
          return deliv.meal()
        }))
        return myMeals
      }

      mealTotals() {
        let mealObj = {}
        const myDeliveries = this.deliveries()
        for (const key in myDeliveries) {
          let myKey = myDeliveries[key].mealId
          if (mealObj[myKey] === undefined) {
            mealObj[myKey] = 1
          } else {
            mealObj[myKey] += 1
          }
        }
        debugger
        return mealObj
      }

    }
  }
)()
