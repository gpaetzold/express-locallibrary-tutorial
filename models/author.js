var mongoose = require('mongoose');
const {DateTime} = require('luxon');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

// Virtual for author's name
AuthorSchema
        .virtual('name')
        .get(function () {
            // Return an empty string if either first or family name are unknown
            var fullname = '';
            if (this.first_name && this.family_name) {
                fullname = this.family_name + ', ' + this.first_name;
            }
            if (!this.first_name || !this.family_name) {
                fullname = '';
            }
            return fullname;
        });

// Virtual for author's lifespan
/* AuthorSchema
 .virtual('lifespan')
 .get(function () {
 return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
 }); */

// Virtual for author's URL
AuthorSchema
        .virtual('url')
        .get(function () {
            return '/catalog/author/' + this._id;
        });

// Virtual for author's lif span
AuthorSchema.virtual('lifespan').get(function () {
    var lifetime_string = '', born, died;
    if (this.date_of_birth) {
        born = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    if (this.date_of_death) {
        died = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    }
    if (born && died) {
        lifetime_string = born + ' - ' + died;
    } else if (born) {
        lifetime_string = 'Born: ' + born;
    } else if (died) {
        lifetime_string = 'Died: ' + died;
    } else {
        lifetime_string = 'Life span unknown';
    }
    return lifetime_string;
});

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function () {
    return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);
