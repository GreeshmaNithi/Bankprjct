//import jsonwebtoken
const e = require('express')
const jwt = require('jsonwebtoken')

//import USER(model)
const db = require('./db')



database={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"malu",password:1001,balance:5000,transaction:[]},
    1002:{acno:1002,uname:"nithi",password:1002,balance:5000,transaction:[]}

  }

  //register definition

  const register = (acno, password, uname) => {
    //asynchronous 
    return db.User.findOne({acno})
    .then(user=>{
      console.log(user);
      if(user)
      {
        return {
          statusCode: 422,
          status: false,
          message: "already exist"
        }
      }
      else
      {
        const newUser = new db.User(
          {
            acno,
            uname,
            password,
            balance: 0,
            transaction: []
      
          }
        )
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "succsefully registerdd"
        }
      }
    })


    // if (acno in database) {
      
    // }
    // else {
  
    //   database[acno] = {
    //     acno,
    //     uname,
    //     password,
    //     balance: 0,
    //     transaction: []
  
    //   }
    //   console.log(database);
  
      
    // }
  }
  






  

//LOGIN DEFINITION

const login = (acno, password) => {
  //asynchronous
  return db.User.findOne({acno,password})
  .then(user=>{
    if(user)
    {
    currentAcno = acno

      currentUname = user.uname

      //token generation
      const token = jwt.sign({
        currentAcno : acno  
      }, 'supersecretkey')

      return {
        statusCode: 200,
        status: true,
        message: "succsefully login",
        currentAcno,
        currentUname,
        token
      }
    }
    else
    {
      return {
        statusCode: 422,
        status: false,
        message: "incorect password or account number"
      }
    }
  })





  // if (acno in database) {
  //   if (password == database[acno]["password"]) {
      
  //   }
  //   else {
      
  //   }
  // }
  // else {
  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "invalid user"
  //   }
  // }
}


//deposit

const deposit = (acno, password, amt) => {

  var amount = parseInt(amt)
  //asynchronous
    return db.User.findOne({acno,password})
    .then(user=>{
      if(user)
      {
        user.balance+=amount
        user.transaction.push({
          amount: amount,
          type: "CREDIT"
        })
        user.save()
  
        return {
          statusCode: 200,
          status: true,
          message: amount + ` succesfully deposited and new balance is ` + user.balance
  
        }

      }
      else
      {
        return {
          statusCode: 422,
          status: false,
          message: "incorect password or account number"
        }
      }
    })

  
}




//withdraw

const withdraw=(req,acno, password, amt)=> {
  var amount = parseInt(amt)
  var currentAcno = req.currentAcno

  //asynchronous

  return db.User.findOne({acno,password})
    .then(user=>{

      if(user)
      {

        if(currentAcno != acno)
        {
          return {
            statusCode: 422,
            status: false,
            message: "operation denied....."
          } 
        }

        if(user.balance > amount)
        {
          user.balance-=amount
          user.transaction.push({
            amount: amount,
            type: "DEBIT"
          })
          user.save()
    
          return {
            statusCode: 200,
            status: true,
            message: amount + ` succesfully debited and new balance is ` + user.balance
    
          }
        }
        else
        {
          return {
            statusCode: 422,
            status: false,
            message: "insufficient balance"
          } 

        }
       

      }
      else
      {
        return {
          statusCode: 422,
          status: false,
          message: "incorect password or account number"
        }
      }
    })










  
//   if (acno in database) {

//     if (password == database[acno]["password"]) {

//       if(currentAcno == acno)
//       {
//         if (database[acno]["balance"] > amount) {

//           database[acno]["balance"] -= amount
  
//           database[acno]["transaction"].push({
//             amount: amount,
//             type: "DEBIT"
//           })
//           return {
//             statusCode: 200,
//             status: true,
//             message: amount + ` succesfully debited and new balance is ` + database[acno]["balance"]
    
//           }
  
//         }
  
//         else {
//                }
  
//       }

//       else
//       {
        
//       }

     
//     }
//     else {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "incorect password"
//       }
//     }

//   }
//   else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "invalid user"
//     }  
//   }

}



//get transaction

const getTransaction=(acno)=> {

  //asynchronous
  return db.User.findOne({acno})
  .then(user=>
    {
      if(user)
      {
        return {
          statusCode: 200,
          status: true,
          transaction:user.transaction
    
        }
      }
      else
      {
        return {
          statusCode: 422,
          status: false,
          message: "invalid user"
        }  
      }
    })

  
}

//delete api
const deleteAcc = (acno)=>
{
  //asynchronous
  return db.User.deleteOne({acno})
  .then(user=>
    {
      if(!user)
      {
        return{
          statusCode : 422,
          status : false,
          message : "operation failed"
        }
      }
      return{
        statusCode : 200,
          status : true,
          message : "the request account number  "+acno+" deleted successfully"
      }
    })
}



























  module.exports=
  {
      register,
      login,
      deposit,
      withdraw,
      getTransaction,
      deleteAcc
  }