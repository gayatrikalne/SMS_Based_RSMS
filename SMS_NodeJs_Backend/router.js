const router = require("express").Router();
const {Admin} = require("./adminDetails");
const {Organization} = require("./orgDetails");
const {Employee} = require("./EmployeeDetails");
const {ServerInfo} = require("./ServerDetails");
const {Notification} = require("./NotificationDetails");
const bcrypt = require("bcrypt");
const {sequelize}  = require("./database");


//API for admin 
const getAllAdmin = async (req,res) => {
    const admins = await Admin.findAll({});
    res.json(admins);
};

const getAdmin = async (req,res) => {
    const id = req.params.adminId;
    const admin = await Admin.findByPk(id);
    res.send(admin);
};

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


//API for Organization
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

//API for Employee 
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

const getFailedInactiveServer = async (req, res) => {
  try {
      const servers = await ServerInfo.findAll({
          where: {
              status: ['Failed', 'Inactive'] // Filter by specific statuses
          }
      });
      res.json(servers);
  } catch (error) {
      console.error('Error fetching servers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getServer = async (req,res) => {
    const id = req.params.ServerId;
    const server= await ServerInfo.findByPk(id);
    res.send(server);
};

const saveServer = async (req, res) => {
  const data = req.body;
  try {
      // Remove the 'id' field from the data object
      delete data.id;
      // Create a new server record without specifying the 'id' field
      const newCreatedServer = await ServerInfo.create(data);
      res.json(newCreatedServer);
  } catch (error) {
      console.error('Error creating server:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
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

const login = (req,res) => {
    const data=req.body;
    if(data.username==="sysadmin" && data.password==="sysadmin"){
        res.json({token:"thisismytoken"});
    } else{
        res.status(401).send("Invalid Credintial");
    }
};

ServerInfo.hasMany(Notification, { foreignKey: 'id' });
// Define association in NotificationDetails model
Notification.belongsTo(ServerInfo, { foreignKey: 'id' });

  router.get('/join-tables', async (req, res) => {
    try {
      const query = `
        SELECT *
        FROM ServerDetails
        INNER JOIN NotificationDetails ON ServerDetails.id = NotificationDetails.id
      `;
      
      const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      res.json(results);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/auth/adminlogin', async (req, res) => {
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
        // res.status(200).json({ message: 'Login successful!' });
        res.json({ token: "thisismytoken" });
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

Employee.hasMany(ServerInfo, { foreignKey: 'EmpId' });

ServerInfo.belongsTo(Employee, { foreignKey: 'EmpId' });

router.post('/auth/emplogin', async (req, res) => {
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

    console.log("reqbody",emp.EmpId , emp.Password );

    if (emp) {
      // Compare the provided password with the password in the database
      if (password === emp.Password) {
        req.session.empId = emp.EmpId;
        console.log("session empid"+req.session.empId);
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

// const handleEmployeeLogin = async (empId, password) => {
//   try {
//     if (!empId || !password) {
//       return { status: 400, message: 'Both empId and password are required' };
//     }

//     // Find the employee by empId
//     const emp = await Employee.findOne({
//       where: {
//         EmpId: empId,
//       },
//     });

//     if (emp) {
//       // Compare the provided password with the password in the database
//       if (password === emp.Password) {
//         return { status: 200, message: 'Login successful!'+emp.EmpId };
//       } else {
//         return { status: 401, message: 'Invalid credentials' };
//       }
//     } else {
//       return { status: 401, message: 'Invalid credentials' };
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return { status: 500, message: 'Internal Server Error' };
//   }
// };

// router.post('/auth/emplogin', async (req, res) => {
//   const { empId, password } = req.body;

//   try {
//     const result = await handleEmployeeLogin(empId, password);
//     req.session.empId = emp.EmpId;
//     console.log("Session EmpId",req.session.empId);
//     res.status(result.status).json({ message: result.message });
//   } catch (error) {
//     console.error('Route error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// console.log("line396",req.session.empId)
async function joinTablesForEmpId(req, res) {
  try {
    // Retrieve empId from session
    const empId  =req.emp;
    //const empId  = "E101";

    if (!empId) {
      throw new Error('EmpId is undefined');
    }

    // Query ServerDetails table with association to NotificationDetails
    const query = `
      SELECT *
      FROM ServerDetails AS sd
      INNER JOIN NotificationDetails AS nd ON sd.id = nd.id
      WHERE sd.EmpId = :empId
    `;

    // Executing the query using Sequelize
    const results = await sequelize.query(query, {
      replacements: { empId: empId },
      type: sequelize.QueryTypes.SELECT
    });

    // Sending the results as JSON response
    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

router.get("/join-tables-empid",joinTablesForEmpId);


// handleEmployeeLogin function remains unchanged
// const handleEmployeeLogin = async (empId, password) => {
//   try {
//     if (!empId || !password) {
//       return { status: 400, message: 'Both empId and password are required' };
//     }

//     const emp = await Employee.findOne({
//       where: { EmpId: empId },
//     });

//     if (emp) {
//       if (password === emp.Password) {
//         return { status: 200, message: 'Login successful!', empId: emp.EmpId };
//       } else {
//         return { status: 401, message: 'Invalid credentials' };
//       }
//     } else {
//       return { status: 401, message: 'Invalid credentials' };
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     return { status: 500, message: 'Internal Server Error' };
//   }
// };

// // Session handling middleware (using express-session)
// // This assumes you've configured express-session properly
// // and are using it as middleware in your application

// // joinTablesForEmpId function
// async function joinTablesForEmpId(req, res) {
//   try {
//     // Retrieve empId from session
//     const empId = req.session.empId;

//     if (!empId) {
//       throw new Error('EmpId is undefined');
//     }

//     // Query using Sequelize associations
//     const results = await ServerDetails.findAll({
//       where: { EmpId: empId },
//       include: [{ model: NotificationDetails, required: true }],
//     });

//     // Sending the results as JSON response
//     res.json(results);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// // Router endpoint
// router.post("/auth/emplogin",handleEmployeeLogin);
// router.get("/join-tables-empid", joinTablesForEmpId);


  // Assign route handlers to the router

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
router.get("/serverFailedInactive",getFailedInactiveServer);
router.get("/server/:ServerId",getServer);
router.post("/server",saveServer);
router.delete("/server/:id",deleteServer);
router.put("/server",updateServer);

router.get("/notifications",getAllNotification);
router.get("/notifications/:NotificationId",getNotification);
router.post("/notifications",saveNotification);


module.exports = router;
