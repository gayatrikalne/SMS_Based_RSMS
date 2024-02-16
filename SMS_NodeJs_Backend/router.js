const router = require("express").Router();
const {Admin} = require("./adminDetails");
const {Organization} = require("./orgDetails");
const {Employee} = require("./EmployeeDetails");
const {ServerInfo} = require("./ServerDetails");
const {Notification} = require("./NotificationDetails");
const bcrypt = require("bcrypt");
const {sequelize} = require("sequelize");

const getAllAdmin = async (req,res) => {
    const admins = await Admin.findAll({});
    res.json(admins);
};

const getAdmin = async (req,res) => {
    const id = req.params.adminId;
    const admin = await Admin.findByPk(id);
    res.send(admin);
};

// const saveAdmin = async (req,res) => {
//     const data = req.body;
//     const newCreatedAdmin = await Admin.create(data);
//     res.json(newCreatedAdmin);
// };

const saveAdmin = async (req, res) => {
    try {
        const data = req.body;
        
        // Using Sequelize as an example, assuming Admin is a Sequelize model
        const newCreatedAdmin = await Admin.create(data);

        // Send the newly created admin as a JSON response
        res.json(newCreatedAdmin);
    } catch (error) {
        // Handle errors appropriately, for example, sending an error response
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteAdmin = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await Admin.destroy({where:{CompanyId:id}});
    res.json(deleteCount);
};

const updateAdmin = async (req,res) => {
    const data = req.body;
    const updateObject = {...data};
    delete updateObject.AdminId;
    const updateCount = await Admin.update(updateObject,{
        where : {AdminId:data.AdminId},
    });
    res.json(updateCount);
};

const getAllOrg = async (req,res) => {
    const organizations = await Organization.findAll({});
    res.json(organizations);
};

const getOrg = async (req,res) => {
    const id = req.params.orgId;
    const organization = await Organization.findByPk(id);
    res.send(organization);
};

const saveOrg= async (req,res) => {
  try {
    // Attempt to insert the record into the database
    // Your database insert code here
      const data = req.body;
      const newCreatedOrg = await Organization.create(data);
      res.json(newCreatedOrg);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
        console.error('Duplicate entry error: The organization ID already exists.');
        // Handle the error gracefully, such as notifying the user or logging it
    } else {
        console.error('An error occurred:', error);
    }
  }
};



const deleteOrg = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await Organization.destroy({where:{id:id}});
    res.json(deleteCount);
};

const updateOrg = async (req,res) => {
    const data = req.body;
    const updateObject = {...data};
    delete updateObject.id;
    const updateCount = await Organization.update(updateObject,{
        where : {id:data.id},
    });
    res.json(updateCount);
};

const getAllEmp = async (req,res) => {
    const emp = await Employee.findAll({});
    res.json(emp);
};

const getEmp = async (req,res) => {
    const id = req.params.empId;
    const emp = await Employee.findByPk(id);
    res.send(emp);
};

const saveEmp = async (req,res) => {
    const data = req.body;
    const newCreatedemp = await Employee.create(data);
    res.json(newCreatedemp);
};

const deleteEmp = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await Employee.destroy({where:{id:id}});
    res.json(deleteCount);
};

const updateEmp = async (req,res) => {
  const data = req.body;
  const updateObject = {...data};
  delete updateObject.id;
  const updateCount = await Employee.update(updateObject,{
      where : {id:data.id},
  });
  res.json(updateCount);
};

const getAllserver = async (req,res) => {
    const server = await ServerInfo.findAll({});
    res.json(server);
};

const getServer = async (req,res) => {
    const id = req.params.ServerId;
    const server= await ServerInfo.findByPk(id);
    res.send(server);
};

const saveServer= async (req,res) => {
    const data = req.body;
    const newCreatedserver = await ServerInfo.create(data);
    res.json(newCreatedserver);
};

const deleteServer = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await ServerInfo.destroy({where:{id:id}});
    res.json(deleteCount);
};

const updateServer = async (req,res) => {
  const data = req.body;
  const updateObject = {...data};
  delete updateObject.id;
  const updateCount = await ServerInfo.update(updateObject,{
      where : {id:data.id},
  });
  res.json(updateCount);
};


const getAllNotification = async (req,res) => {
    const notification = await Notification.findAll({});
    res.json(notification);
};

const getNotification = async (req,res) => {
    const id = req.params.NotificationId;
    const notification= await Notification.findByPk(id);
    res.send(notification);
};

const saveNotification = async (req,res) => {
    const data = req.body;
    const newCreatednotification= await Notification.create(data);
    res.json(newCreatednotification);
};

const deleteNotification = async (req,res) => {
    const id = req.params.id;
    const deleteCount = await Notification.destroy({where:{NotificationId:id}});
    res.json(deleteCount);
};

const login = (req,res) => {
    const data=req.body;
    if(data.username==="sysadmin" && data.password==="sysadmin"){
        res.json({token:"thisismytoken"});
    } else{
        res.status(401).send("Invalid Credintial");
    }
};

Notification.hasMany(ServerInfo, { foreignKey: 'ServerId' });
ServerInfo.belongsTo(Notification, { foreignKey: 'ServerId' });

  // Use callback for findAll
  Notification.findAll({
    include: [{
      model: ServerInfo,
      required: true, // Inner join
    }],
  }, (queryError, results) => {
    if (queryError) {
      console.error('Error executing query:', queryError);
      return;
    }
    console.log('Query results:', results);
  });

router.get("/servernotification", (req, res) => {
  Notification.findAll({
    include: [{
      model: ServerInfo,
      required: true, // Inner join
    }],
  }, (queryError, results) => {
    if (queryError) {
      console.error('Error executing query:', queryError);
      res.status(500).send('Error executing query');
      return;
    }
    res.json(results);
  });
});

router.post('/login', async (req, res) => {
  const { adminId, password } = req.body;

  try {
    if (!adminId || !password) {
      return res.status(400).json({ error: 'Both adminId and password are required' });
    }

    // Find the admin by adminId
    const admin = await Admin.findOne({
      where: {
        AdminId: adminId,
      },
    });

    if (admin) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, admin.Password);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.post('/emplogin', async (req, res) => {
//   const { empId, password } = req.body;

//   try {
//     if (!empId || !password) {
//       return res.status(400).json({ error: 'Both adminId and password are required' });
//     }

//     // Find the admin by adminId
//     const emp = await Employee.findOne({
//       where: {
//         EmpId: empId,
//       },
//     });

//     if (emp) {
//       // Compare the provided password with the hashed password in the database
//       const passwordMatch = await bcrypt.compare(password, emp.Password);

//       if (passwordMatch) {
//         res.status(200).json({ message: 'Login successful!' });
//       } else {
//         res.status(401).json({ error: 'Invalid credentials' });
//       }
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.post('/emplogin', async (req, res) => {
  const { empId, password } = req.body;

  try {
    if (!empId || !password) {
      return res.status(400).json({ error: 'Both empId and password are required' });
    }

    // Find the employee by empId
    const emp = await Employee.findOne({
      where: {
        EmpId: empId,
      },
    });

    if (emp) {
      // Compare the provided password with the password in the database
      if (password === emp.Password) {
        res.status(200).json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// router.post('/register', async (req, res) => {
//     const { adminId, adminName, password, email, contact } = req.body;
  
//     try {
//       // Validation checks
//       if (!adminId || !adminName || !password || !email || !contact) {
//         return res.status(400).json({ error: 'All fields are required for registration' });
//       }
  
//       // Check if the adminId is already taken
//       const existingAdmin = await Admin.findOne({
//         where: {
//           AdminId: adminId,
//         },
//       });
  
//       if (existingAdmin) {
//         return res.status(400).json({ error: 'AdminId is already taken' });
//       }
  
//       // Create a new admin record
//       const newAdmin = await Admin.create({
//         AdminId: adminId,
//         AdminName: adminName,
//         Password: password,
//         EmailID: email, // Update the field name here
//         Contact: contact,
//       });
  
//       res.status(201).json({ message: 'Registration successful!', admin: newAdmin });
//     } catch (error) {
//         if (error.name === 'SequelizeValidationError') {
//           const validationErrors = error.errors.map((e) => e.message);
//           return res.status(400).json({ error: 'Validation error', details: validationErrors });
//         }
      
//         console.error('Registration error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//   });


router.post('/register', async (req, res) => {
    const { adminId, adminName, password, email, contact } = req.body;
  
    try {
      // Validation checks
      if (!adminId || !adminName || !password || !email || !contact) {
        return res.status(400).json({ error: 'All fields are required for registration' });
      }
  
      // Check if the adminId is already taken
      const existingAdmin = await Admin.findOne({
        where: {
          AdminId: adminId,
        },
      });
  
      if (existingAdmin) {
        return res.status(400).json({ error: 'AdminId is already taken' });
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin record with the hashed password
      const newAdmin = await Admin.create({
        AdminId: adminId,
        AdminName: adminName,
        Password: hashedPassword,
        EmailID: email,
        Contact: contact,
      });
  
      res.status(201).json({ message: 'Registration successful!', admin: newAdmin });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((e) => e.message);
        return res.status(400).json({ error: 'Validation error', details: validationErrors });
      }
  
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.post("/auth/login", login);

router.get("/admin",getAllAdmin);
router.get("/admin/:adminId",getAdmin);
router.post("/admin",saveAdmin);
router.delete("/admin/:id",deleteAdmin);
router.put("/admin",updateAdmin);

router.get("/organization",getAllOrg);
router.get("/organization/:orgId",getOrg);
router.post("/organization",saveOrg);
router.delete("/organization/:id",deleteOrg);
router.put("/organization",updateOrg);

router.get("/employee",getAllEmp);
router.get("/employee/:empId",getEmp);
router.post("/employee",saveEmp);
router.delete("/employee/:id",deleteEmp);
router.put("/employee",updateEmp);

router.get("/server",getAllserver);
router.get("/server/:ServerId",getServer);
router.post("/server",saveServer);
router.delete("/server/:id",deleteServer);
router.put("/server",updateServer);

router.get("/notifications",getAllNotification);
router.get("/notifications/:NotificationId",getNotification);
router.post("/notifications",saveNotification);
router.delete("/notifications/:id",deleteNotification);

module.exports = router;
