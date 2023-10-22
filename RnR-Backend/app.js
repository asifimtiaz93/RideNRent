require("dotenv").config();
require("./config/database")
const { parseISO, startOfHour, addHours } = require('date-fns');
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const saltrounds = 10;
const Psngr = require("./models/psngrModel");
const Dvr = require("./models/dvrModel");
const Ride = require("./models/rideModel");
const RideHistory = require("./models/ridehistoryModel");
const jwt = require('jsonwebtoken');
var global = "";
//const passport = require('passport');
const session = require('express-session');
// require("./config/passport")
const MongoStore = require('connect-mongo');
const passport = require("passport");
const upload = require("./config/multer");
const ridehistoryModel = require("./models/ridehistoryModel");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads'));
const { Server } = require("socket.io");
app.use(passport.initialize());
// app.use(passport.session()); 
const http = require("http");
const server = http.createServer(app);

const io = new Server( server );


io.on("connection", (socket)=>{
  console.log('A new user has been connected', socket.id);
});


require("./config/passport");


// home route 
app.get("/", (req,res) =>{
    res.send("<h1>Welcome to RideNRent</h1>");

})





//-----------------------------------------Routes---------------------------------------------
//register route : post
app.post("/register", async (req,res) =>{
    const psngr = await Psngr.findOne({email: req.body.email});
    if (psngr) {
        res.status(400).json({
            message: "User already exists"
        })
    }
    try {
        bcrypt.hash(req.body.password, saltrounds, async function(err, hash) {
        const newPsngr = new Psngr({
            email: req.body.email,
            password: hash,
            fullName: req.body.fullName,
            mobile: req.body.mobile,
        })
        await newPsngr.save().then((user) =>{
            res.send({
                success: true,
                message: "User is created Successfully",
                // user: {
                //     id: user._id,
                // }
            })
        })
    })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            data: null
            })
      }
});


app.post("/registerDvr", async (req,res) =>{
  const dvr = await Dvr.findOne({email: req.body.email});

  if (dvr) {
      res.status(400).json({
          message: "User already exists"
      })
  }
  try {
      bcrypt.hash(req.body.password, saltrounds, async function(err, hash) {
      const newDvr = new Dvr({
          email: req.body.email,
          password: hash,
          fullName: req.body.fullName,
          mobile: req.body.mobile,
          vehnum: req.body.vehnum,
          licnum: req.body.licnum,
          make: req.body.make,
          model: req.body.model,
          cap: req.body.capacity,
          year: req.body.year,
          color: req.body.color,

      
      })
      await newDvr.save().then((user) =>{
          res.send({
              success: true,
              message: "Driver is created Successfully",
          })
      })
  })
  }
  catch (error) {
      res.status(500).json({
          message: error.message,
          success: false,
          data: null
          })
    }
});


//register route :get
app.get("/register", (req,res) =>{
    res.send("<h1>Welcome to RideNRent registration</h1>");

})

//login pax route : post
app.post("/loginpas", async (req,res, next) =>{
  const user = await Psngr.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found"
    })
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(400).send({
      success: false,
      message: "Wrong Password"
    })
  }

  const payload = {
    id: user._id,
    email: user.email,
  }
  const token = jwt.sign(payload, "Random String", {expiresIn: '1d'}) ;
  return res.status(200).send({
    success: true,
    message: "User logged in successfully",
    token: "Bearer " +token,
  })

});

//login dvr
app.post("/loginDvr", async (req,res, next) =>{
  const dvr = await Dvr.findOne({email: req.body.email});
  if (!dvr) {
    return res.status(400).send({
      success: false,
      message: "User not found"
    })
  }
  if (!bcrypt.compareSync(req.body.password, dvr.password)) {
    return res.status(400).send({
      success: false,
      message: "Wrong Password"
    })
  }

  const payload = {
    id: dvr._id,
    email: dvr.email,
  }
  const token = jwt.sign(payload, "Random String", {expiresIn: '1d'}) ;
  return res.status(200).send({
    success: true,
    message: "Dvr logged in successfully",
    token: "Bearer " +token,
  })

});




app.get("/profilePsngr", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Ensure the user is authenticated (JWT token is valid)
  const userId = req.user._id; // Access the authenticated user's ID
  //console.log(userId);
  
  // Use the user ID to fetch passenger information from the database
  try {
    // Use async/await to fetch passenger information
    const passenger = await Psngr.findById(userId);

    if (!passenger) {
      // If passenger not found, return an appropriate response
      return res.status(404).json({ message: "Passenger not found" });
    }

    // If passenger found, return passenger information
   // const { fullName, email, mobile } = passenger;
    res.status(200).json({ passenger });
  } catch (err) {
    // Handle errors, e.g., database query error
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/profileDvr", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Ensure the user is authenticated (JWT token is valid)
  const userId = req.user._id; // Access the authenticated user's ID

  try {
    // Use async/await to fetch passenger information
    const dvr = await Dvr.findById(userId);

    if (!dvr) {
      // If dvr not found, return an appropriate response
      return res.status(404).json({ message: "dvr not found" });
    }

    // If dvr found, return dvr information
    const { fullName, email, mobile } = dvr;
    res.status(200).json({ dvr });
  } catch (err) {
    // Handle errors, e.g., database query error
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.post("/registerRide", async (req, res) => {
  try {
    // Extract ride data from the request body
    const { driver, pickup, destination, time, seats, fare } = req.body;

    // Create a new Ride document using the Ride model
    const newRide = new Ride({
      driver,
      pickup,
      destination,
      time,
      seats,
      fare,
  
    });

    // Save the new ride document to the database
    await newRide.save();

    // Respond with a success message
    return res.status(201).json({ success: true, message: "Ride registered successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ success: false, message: "An error occurred while registering the ride" });
  }
});

//search ride post route

app.post("/searchrides", async (req, res) => {
  try {
    // Extract search criteria from the request body
    const { pickup, destination,  seats } = req.body;

   
    const matchingRides = await Ride.find({
      pickup: pickup,
      destination: destination,
      status: "Available", // Ensure the ride is still available
      seats: { $gte: seats }, // Ensure available seats are greater than or equal to the requested seats
    }).populate({
      path: 'driver', // Assuming 'driver' is the name of the field referencing the Driver model
      select: 'fullName rating', // Specify the field you want to retrieve from the Driver model
    });

    // Return the matching rides as a JSON response
    return res.status(200).json(matchingRides);
  } catch (error) {
    // Handle any errors that occur during the search
    console.error(error);
    return res.status(500).json({ message: "An error occurred while searching for rides" });
  }
});

//---------serach boked rides
app.get("/searchBookedRide", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const passengerId = req.user._id;
  try {
    if (!passengerId) {
      return res.status(400).json({ message: "Passenger ID is required" });
    }
    const ridebook = await Ride.find({
       passenger: passengerId,
       status: "Booked"
      
      }).populate({
        path: 'driver',
        select: 'fullName mobile',
        
       });
   


    // Return the matching rides as a JSON response
    return res.status(200).json(ridebook);
  } catch (error) {
    // Handle any errors that occur during the search
    console.error(error);
    return res.status(500).json({ message: "An error occurred while searching for rides" });
  }
});

app.get("/searchridehistory", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const passengerId = req.user._id;
  try {
    if (!passengerId) {
      return res.status(400).json({ message: "Passenger ID is required" });
    }
    const rideHistoryData = await RideHistory.find({
       passenger: passengerId }).populate({
        path: 'driver',
        select: 'fullName',
       });
   


    // Return the matching rides as a JSON response
    return res.status(200).json(rideHistoryData);
  } catch (error) {
    // Handle any errors that occur during the search
    console.error(error);
    return res.status(500).json({ message: "An error occurred while searching for rides" });
  }
});
//----------bookride-------------
// ... (previous code)

app.post("/bookride/:rideId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const passengerId = req.user._id;
  const rideId = req.params.rideId;

  try {
    // First, check if the passenger is allowed to book this ride (you can add more checks if needed)
    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.seats <= 0) {
      return res.status(400).json({ message: "No available seats for this ride" });
    }

    // Update the Ride model to reduce the available seats
    ride.seats = ride.seats - 1;

    // Update the status of the ride to "Booked"
    ride.status = "Booked";

    // Add the passenger to the ride (you may need to have a field in your model to store booked passengers)
    ride.passenger = passengerId;

    // Save the updated ride
    await ride.save();

    return res.status(200).json({ message: "Ride booked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while booking the ride" });
  }
});

// ... search driver rides
app.get('/driverRides', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const driverId = req.user._id; // Get the authenticated driver's ID from the JWT token

    // Fetch the rides listed by the driver with the matching driverId
    const driverRides = await Ride.find({ driver: driverId });

    // Return the list of rides as a JSON response
    return res.status(200).json(driverRides);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching driver rides' });
  }
});

// ... search ride History
app.get('/dvrRideHistory', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const driverId = req.user._id; // Get the authenticated driver's ID from the JWT token

    // Fetch the rides listed by the driver with the matching driverId
    const driverRides = await RideHistory.find({ driver: driverId });

    // Return the list of rides as a JSON response
    return res.status(200).json(driverRides);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching driver rides' });
  }
});

//-----complete ride----------
app.put("/completeRide/:rideId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const rideId = req.params.rideId;
    const driverId = req.user._id;

    // Find the ride by ID and verify that it belongs to the authenticated driver
    const ride = await Ride.findOne({ _id: rideId, driver: driverId, status: "Booked" });
    
    if (!ride) {
      return res.status(404).json({ message: "Ride not found or cannot be completed" });
    }

    // Update the ride's status to "Completed"
    ride.status = "Completed";
    await ride.save();


    const rideHistory = new RideHistory({
      driver: ride.driver,
      passenger: ride.passenger,
      pickup: ride.pickup,
      destination: ride.destination,
      time: ride.time,
      completionDate: new Date(), 
      fare: ride.fare,
      // Add more fields as needed
    });

    await rideHistory.save();
    // Return a success response
    res.status(200).json({ message: "Ride completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while completing the ride" });
  }
});

app.put("/availableRide/:rideId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const rideId = req.params.rideId;
    const driverId = req.user._id;

    // Find the ride by ID and verify that it belongs to the authenticated driver
    const ride = await Ride.findOne({ _id: rideId, driver: driverId, status: "Completed" });
    
    if (!ride) {
      return res.status(404).json({ message: "Ride not found or cannot be completed" });
    }

    // Update the ride's status to "Completed"
    ride.seats= 4;
    ride.status = "Available";
    await ride.save();

    res.status(200).json({ message: "Ride made available successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while making the ride available again" });
  }
});


app.delete("/deleteRide/:rideId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const rideId = req.params.rideId;
console.log(rideId);
  try {
    // Find the ride by ID
    const ride = await Ride.findById(rideId);
    console.log(ride);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Perform any additional validation here, e.g., check if the ride belongs to the logged-in driver

    // Delete the ride
    await ride.remove();

    return res.status(200).json({ message: 'Ride deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while making the ride available again" });
  }
});
//------------- Uodate Review -----------
app.put('/ReviewRide/:rideId', async (req, res) => {
  const rideId = req.params.rideId;
  const { review } = req.body;
  console.log(review);
  try {
    // Find the ride by its ID
    const ride = await RideHistory.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Update the ride's review field
    ride.review = review;

    // Save the updated ride to the database
    await ride.save();

    const driver = await Dvr.findById(ride.driver);
    if (driver) {
      // Calculate the updated rating based on the new review value
      // For example, you can calculate an average rating over multiple reviews
      const currentRating = driver.rating || 0;
      const ridecount = driver.ridecount || 0;
      console.log(currentRating);
      const newridecount = ridecount + 1;
      console.log(newridecount);
      const sum = (parseFloat(currentRating)  + parseFloat(review)) ;
      console.log(sum);
      newRating = sum / newridecount;

      console.log(newRating);
      // Update the driver's rating and ridecount fields
      driver.rating = newRating;
      driver.ridecount = newridecount;

      // Save the updated driver to the database
      await driver.save();
    }
    res.status(200).json({ message: 'Ride review updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the ride review' });
  }
});




 

//login route :get
app.get("/login", (req,res) =>{
    res.send("<h1>Welcome to RideNRent Login</h1>");

})

app.get("/profile", passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = req.user._id; // Access the user ID
  global = userId;
  
  //console.log(global);
  const data = Psngr.findById(userId);
  // data.exec((err, user) => {
  //   if (err) {
  //     // Handle the error
  //     console.error(err);
  //     return res.status(500).json({ error: "An error occurred" });
  //   }
  
  //   if (!user) {
  //     // User not found
  //     return res.status(404).json({ message: "User not found" });
  //   }
  
  //   // Access the user's name and email
  //   const fullName = user.fullName;
  //   const email = user.email;
  //   console.log(email);
  //   // Now you can use fullName and email as needed
  //   res.status(200).json({ fullName, email });
  // });
  
  // Now you can use the user ID as needed
  res.status(200).json({ userId });
}
);

// // logout route
// app.get("/logout", (req, res) => {
//   try {
//     req.logout((err) => {
//       if (err) {
//         return next(err);
//       }
//       res.redirect("/");
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });


app.post("/uploadimg",upload.single("image"), async(req,res) =>{
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const imageUrl = req.file.filename;
  try {
    
    console.log(global);
    const updatedUser = await Psngr.findByIdAndUpdate(global, { image: imageUrl });

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/uploadimgDvr",
  passport.authenticate('jwt', { session: false }),
  upload.single("image"), async(req,res) =>{
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const driverId = req.user._id; 
  const imageUrl = req.file.filename;
  try {
    
    console.log(driverId);
    const updatedUser = await Dvr.findByIdAndUpdate(driverId, { image: imageUrl });

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/uploadimgDvr",
  passport.authenticate('jwt', { session: false }),
  upload.single("image"), async(req,res) =>{
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const driverId = req.user._id; 
  const imageUrl = req.file.filename;
  try {
    
    console.log(driverId);
    const updatedUser = await Dvr.findByIdAndUpdate(driverId, { image: imageUrl });

    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/uploadNidDvr",
  passport.authenticate('jwt', { session: false }),
  upload.single("image"), async(req,res) =>{
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const driverId = req.user._id; 
  const imageUrl = req.file.filename;
  try {
    
    console.log(driverId);
    const updatedUser = await Dvr.findByIdAndUpdate(driverId, { nid: imageUrl });
    
    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/imgDvr",
  passport.authenticate('jwt', { session: false }),
  async(req,res) =>{

  const driverId = req.user._id; 

  try {
    
    console.log(driverId);
    const img = await Dvr.findById(driverId);
    console.log(img);
    if (!updatedUser) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


//404
app.use((req,res,next) => {
    //res.status(404).send("Sorry can't find that!")
    res.status(404).json({
        message: "Sorry can't find that!"
    })
   
})

module.exports = app;