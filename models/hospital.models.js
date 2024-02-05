
const { Schema, model } = require('mongoose');

const districts = ['Gasabo','Kicukiro','Nyarugenge','Burera',
                    'Gakenke','Gicumbi','Musanze','Rulindo', 'Gisagara',
                    'Huye','Kamonyi','Muhanga','Nyamagabe','Nyanza',
                    'Nyaruguru','Ruhango', 'Bugesera','Gatsibo','Kayonza',
                    'Kirehe','Ngoma','Nyagatare','Rwamagana','Karongi','Ngororero',
                    'Nyabihu','Nyamasheke','Rubavu','Rusizi','Rutsiro'
                  ]

const hospitalSchema = new Schema({
    hospitalName: {
        type: String,
        required: true,
        unique: true,
    },
    hospitalCode: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const hospitalModel = model('hospital', hospitalSchema);
const hospitalModel = model('Hospital', hospitalSchema);
module.exports = hospitalModel;
