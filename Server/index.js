const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
//passport
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
//jwt
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

//jsonwebtoken
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { createProduct } = require('./Controller/Product');
const productsRouter = require('./routes/Products');
const brandsRouter = require('./routes/Brands');
const categoriesRouter = require('./routes/Categories');
const userRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const orderRouter = require('./routes/Orders');
const User = require('./modal/User');
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');
const exp = require('constants');
const path = require('path');

const server = express();

dotenv.config()
server.use(cookieParser());
// JWT options
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

// emails
  

//webhook
const endpointSecret = process.env.ENDPOINT_SECRET;

server.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature']; 

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// // middlewares
// server.use(express.raw({type: 'application/json'}));
server.use(express.json()); // to parse req.body
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}));
server.use(express.static(path.resolve(__dirname,'build')));

//passport
server.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // dont create session until something stored
}))
server.use(passport.authenticate('session'));
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log("mongo connected");
}

//routes
server.use('/products', productsRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/users',isAuth(), userRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',isAuth(), cartRouter.router);
server.use('/orders',isAuth(), orderRouter.router);

// strategy for signin
passport.use('local',
    new LocalStrategy({usernameField:'email'},
    async function (email, password, done) {
        try {
            const user = await User.findOne({ email: email }).exec();
            if (!user) {
                return done(null, false, { message: 'Invalid Credentials' });
            }
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {

                if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                    return done(null, false, { message: 'Invalid Credentials' });
                }

                const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
                return done(null, {token});// this line send data to searialize

            });

        } catch (error) {
            done(error);
        }
    }
    ));

// strategy for JWT
passport.use('jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, sanitizeUser(user));// this line send data to searialize
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (error) {
            return done(err, false);
        }
    }));

// this creates session variable req.user on being ccalled from callbacks
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, { id: user.id, role: user.role });
    });
});

// this creates session variable req.user when called from authorised request
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

//PAYMENTS
const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

server.listen(process.env.PORT, () => {
    console.log("server started");
})