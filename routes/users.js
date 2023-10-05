const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

function getDateFromString(strDate) {
  let [dd,mm,yyyy] = strDate.split('-')
  return new Date(yyyy+"/"+mm+"/"+dd);
}

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  let isSort = req.query.sort;
  if(isSort) {
    res.send(users.sort(function(a,b){
      let d1 = getDateFromString(a.DOB);
      let d2 = getDateFromString(b.DOB);
      return d1 - d2;
    }));
  }
  else{
    res.send(users);
  }
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);
});

// GET by specific last name request: Retrieve a single user with last name
router.get("/last-name/:lastname",(req,res)=>{
  const lastName = req.params.lastname;
  let filtered_users = users.filter((user) => user.lastName === lastName);
  if(filtered_users.length > 0) {
    res.send(filtered_users);
  }
  else {
    res.send(`No user with last name "${lastName}" found`);
  }
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({"firstName":req.query.firstName,"lastName":req.query.lastName,"email":req.query.email,"DOB":req.query.DOB});
  res.send("The user " + (req.query.firstName) + (" ") + (req.query.lastName) + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if(filtered_users.length > 0) {
    let filtered_user = filtered_users[0];
    let DOB = req.query.DOB;
    if(DOB) {
      filtered_user.DOB = DOB;
    }

    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    res.send(`User with the email ${email} updated`);
  }
  else {
    res.send("Unable to find user");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with email ${email} deleted`);
});

module.exports=router;
