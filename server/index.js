const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const connection = require('./db');
const { body, validationResult } = require('express-validator');
const email = require('./mail/mailer');
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const getOtp = () => otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
const getUserId = () => shortid.generate();

const sendOtp = async (recipientEmail, otp) => {
  const mailOptions = {
    from: 'FundMe <no-reply@fundme.com>',
    to: recipientEmail,
    subject: 'OTP for Account Verification',
    text: `Your OTP is ${otp}`,
  };
  await email.sendMail(mailOptions);
};
app.post('/send-otp', [
  body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required'),
], async (req, res) => {
  const { email} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const otp = getOtp();
    const user_id = getUserId();
    connection.query(
      'INSERT INTO user (user_id,user_email,otp,verified) VALUES (?,?,?,?)',
      [user_id,email,otp, false],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        sendOtp(email, otp);
        return res.status(200).json({ success:true, userId:user_id,message: 'User created successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
});

app.post('/verify-otp', (req, res) => {
  const {email,otp} = req.body;
  connection.query('SELECT otp FROM user WHERE user_email = ?', [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.length === 0 || result[0].otp !== otp) {
      console.log('Database OTP:', result[0].otp, typeof result[0].otp);
console.log('User OTP:', otp, typeof otp);

      return res.status(400).json({ error: 'Invalid OTP or email' });
    }
    connection.query('UPDATE user SET verified = true WHERE user_email = ?', [email], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(200).json({ message: 'User verified successfully' });
    });
  });
});

app.post('/SignUp',(req,res)=>{
  const {email,password} = req.body;
  const hashed_password = bcrypt.hashSync(password,10);
  connection.query('UPDATE user SET password = ? WHERE user_email = ?',[hashed_password,email],(err)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'Internal Server Error'});
    }
    return res.status(200).json({message:'User created successfully'});
  });
})

app.post('/next-signup',(req,res)=>{
  const {email,first_name,last_name,dob} = req.body;
  connection.query('UPDATE user SET first_name = ?, last_name = ?, dob = ? WHERE user_email = ?',[first_name,last_name,dob,email],(err)=>{
    if(err){
      console.log(err);
      return res.status(500).json({success:false, error:'Internal Server Error'});
    }
    return res.status(200).json({success:true , message:'User created successfully'});
  });
})


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'Access Denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid Token' });
    }
    req.userId = decoded.userId;
    next();
  });
};


app.post('/login', [
  body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  connection.query('SELECT password, user_id FROM user WHERE user_email = ?', [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid Email or Password' });
    }

    const { password: hashedPassword, user_id } = result[0];
    const isMatch = bcrypt.compare(password, hashedPassword.toString());
    if (!isMatch){
        return res.status(400).json({ success:false, error: 'Invalid Email or Password' });
    }
      const token = jwt.sign({ userId: user_id },process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ success: true, userId: user_id, token:token, message: 'Login Successful' });
  });
});

app.post("/validate-token", (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    res.json({ success: true, user: decoded });
  });
});

app.post('/createCampaign/:creator_id',[
  body('title').notEmpty().withMessage('Campaign title cannot be empty'),
  body('description').notEmpty().withMessage('Campaign description cannot be empty'),
  body('target_amount').notEmpty().withMessage('Target amount cannot be empty'),
],(req,res)=>{
  const creator_id = req.params.creator_id;
  const {title,description,target_amount,image_url,end_date} = req.body;
  connection.query('insert into campaign (creator_id,title,description,target_amount,created_at,image_url,end_date) values (?,?,?,?,?,?,?)', [creator_id,title,description,target_amount,new Date(),image_url,end_date],(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'Internal Server Error'});
    }
    return res.status(200).json({message:'Campaign created successfully'});
  });
  
});

app.get('/campaigns/:id',(req,res)=>{
  const user_id = req.params.id;
  connection.query('select * from campaign where creator_id = ?',[user_id],(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'Internal Server Error'});
    }
    return res.status(200).json(result);
  });
});

app.get('/getAllCampaigns',(req,res)=>{
  connection.query('select * from campaign limit 25',(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'Internal Server Error'});
    }
    return res.status(200).json(result);
  });
});

app.get('/getCampaignByUserId/:id',(req,res)=>{
  const user_id = req.params.id;
  connection.query('select * from campaign where creator_id = ?',[user_id],(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'Internal Server Error'});
    }
    return res.status(200).json(result);
  });
});

app.post('/addComment',(req,res)=>{
  const {campaignId,comment,userId} = req.body;
  connection.query('insert into comments (campaign_id,content,user_id) values (?,?,?)',[campaignId,comment,userId],(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'Internal Server Error'});
    }
    return res.status(200).json({message:'Comment added successfully'});
  });
});

app.get('/getCommentsByCampaignId/:id', (req, res) => {
  const campaignId = req.params.id;

  if (!campaignId) {
    return res.status(400).json({ error: 'Campaign ID is required' });
  }

  const query = `
    SELECT 
      c.content, 
      CONCAT(u.first_name, ' ', u.last_name) AS name, 
      u.user_email AS profile
    FROM Comments c
    JOIN user u ON c.user_id = u.user_id
    WHERE c.campaign_id = ?;
  `;

  connection.query(query, [campaignId], (err, results) => {
    if (err) {
      console.error('Error fetching comments:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
});

const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
});

app.post('/create-order', async (req, res) => {
  const { amount } = req.body; 

  const options = {
    amount: amount * 100, 
    currency: 'INR',
    receipt: crypto.randomBytes(10).toString('hex'),
    payment_capture: 1, 
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order_id: order.id,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
