const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const port = 3001; // or any other port you prefer


app.use(bodyParser.json());
app.use(cors());



app.post('/login', (req, res) => {
    // implement user login, validate credentials and send a JWT (?) token
    

    let db = new sqlite3.Database('./db/LeaseServer.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });

    db.get(` SELECT ` +
                ` USERNAME USERNAME, ` +
                ` PASSWORD PASSWORD ` +
            ` FROM ` +
                ` LOGIN ` +
            ` WHERE ` +
                ` USERNAME=? AND ` +
                ` PASSWORD=? `, 
                [
                  req.body.username.toUpperCase(), 
                  req.body.password.toUpperCase()
                ], (err, row) => {  
                  
      let found = false;
      if (err) {
        console.error(err.message);
      }
      if(row !== undefined && row.USERNAME !== undefined && row.PASSWORD !== undefined) {
        found = true;
      }

      const data = { message: found};
      res.json(data);
    });

    // close the database connection
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Closed the database connection.');
    });

  

});

app.post('/addTenant', (req, res) => {
  //add tenant information
  
  let data;
  let db = new sqlite3.Database('./db/LeaseServer.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  console.log(`trying to insert data`);
  db.run(`INSERT 
            INTO 
         TENANT (
                FIRSTNAME, 
                LASTNAME, 
                CHECKIN, 
                AMOUNT) 
         VALUES(?,?,?,?)`,
                [`${req.body.firstName}`, 
                `${req.body.lastName}`, 
                `${req.body.checkInDate}`, 
                `${req.body.amount}`], 
        (err) => {
          if (err) {
            console.log('error inserting data');
            data = {message: false};
            res.json(data);
            return console.error(err.message);
          }

          console.log('data successfully inserted');
          data = {message: true};        
          res.json(data);
        }
  );
  

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });

});

app.post('/searchTenant', (req, res) => {
  //search tenant information
  
  let data;
  let db = new sqlite3.Database('./db/LeaseServer.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  console.log(`trying to search data`);
  db.get(` SELECT ` +
          ` FIRSTNAME FIRSTNAME, ` +
          ` LASTNAME LASTNAME, ` +
          ` CHECKIN CHECKIN, ` +
          ` AMOUNT AMOUNT ` +
        ` FROM ` +
          ` TENANT ` +
        ` WHERE ` +
          ` UPPER(FIRSTNAME)=? OR ` +
          ` UPPER(LASTNAME)=? `, 
          [
            req.body.firstOrLastName.toUpperCase(), 
            req.body.firstOrLastName.toUpperCase()
          ], (err, row) => {  
            
    if (err) {
      console.error(err.message);
    }

    const data =  { 
                  firstName: row.FIRSTNAME,
                  lastName: row.LASTNAME,
                  checkInDate: row.CHECKIN,
                  amount: row.AMOUNT
                  };
    res.json(data);
  });
  

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });

});

app.post('/updateTenant', (req, res) => {
  //add tenant information
  
  let data;
  let db = new sqlite3.Database('./db/LeaseServer.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  console.log(`trying to update data`);
  data = [req.body.checkInDate, req.body.amount, req.body.firstName, req.body.lastName];
  db.run(`UPDATE            
          TENANT 
            SET CHECKIN = ?,
                AMOUNT=?               
            WHERE FIRSTNAME=? AND 
                LASTNAME=? `,
                data, 
        (err) => {
          if (err) {
            console.log('error updating data');
            data = {message: false};
            res.json(data);
            return console.error(err.message);
          }

          console.log('data successfully updated');
          data = {message: true};        
          res.json(data);
        }
  );
  

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });

});

app.get('/logout',(req, res) => {
  // implement user logout, e.g. invalidate the token
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});


function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
  });

  setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}