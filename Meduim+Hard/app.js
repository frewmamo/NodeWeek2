const express = require('express');
const app = express();
const Joi = require('joi');
const data = require('./public/database.json');
app.use(express.json());

app.get('/employees', (req,res) => {
    res.send(data)
});

app.get('/employees/:id', (req,res) => {
   let findEmployee = data.employees.find(employee =>{
        return parseInt(req.params.id);
        if (!findEmployee){
            res.status(404).send("Employee Not found"+res.statusCode)
        }
        res.send(findEmployee);
    })
    // delete
    app.delete('/employees/:id',(req,res) =>{
        let findEmployee = data.employees.find(employee =>{
            return parseInt(req.params.id) ===employee.id
        }
    );
        if (!employee) return res.status(404).send('Employee wasnt found');

        const index = data.employees.indexOf(employee);
        data.employees.splice(index, 1);
   
    return res.send(employee);
    });

// validate
    const validateEmployee =(employee) =>{
        const schema = {
            name: Joi.string().min(2).required(),
            salary:Joi.number().required(),
            department:Joi.string().min(2).required(),
        };
        return Joi.validate(employee,schema);
    }

    const port = process.env.PORT || 3000;
    app.listen(port);
})