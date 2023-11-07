const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const {SignUp} = require('../Controllers/SignUpController')
const {SignIn,sendSms} = require('../Controllers/SignInController')


const EMAIL_SECRET = 'mysecretemail';

router.post('/signup', SignUp);

// Endpoint for email verification
router.get('/signup/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
     
  
      // Update the confirmed flag for the patient
      const user = await User.findByIdAndUpdate(id, {
        $set: { confirmed: true },
      }, { new: true });
  
  
      // Redirect to home page
      res.redirect('http://localhost:3000/signin')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } 
  });

  router.post('/signin', SignIn);
  router.post("/sendSms", sendSms);


module.exports = router