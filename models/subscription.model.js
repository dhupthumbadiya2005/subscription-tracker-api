import mongoose  from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String, 
        required: [true, 'Subscription name is required'],
        trim : true,
        minlength: [3, 'Subscription name must be at least 3 characters long'],
        maxlength: [50, 'Subscription name must be at most 50 characters long']
    } , 

    price: {
        type : Number,
        required: [true, 'Price is required'],
        min : [0, 'Price must be a positive number'] ,
        max : [1000000, 'Price must be at most 1,000,000']
    }, 
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR'], // Add more currencies as needed
        default: 'USD'
    }, 

    frequency: {
        type: String,
        enum: ['daily','weekly', 'monthly', 'yearly'],
    },

    category: {
        type: String,
        enum: ['entertainment', 'utilities', 'food', 'health', 'education', 'other'],
        default: 'other' , 
        required: [true, 'Category is required']
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
        default: 'credit_card',
        required: [true, 'Payment method is required']
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
        required: [true, 'Status is required']
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Start date is required'] , 
        validate : {
            validator: function(value) {
                return value <= Date.now(); // Ensure start date is not in the future
            },
            message: 'Start date cannot be in the future'
        }
    },

    renewalDate: {
    type: Date,
    validate: {
        validator: function (value) {
            return !this.startDate || value > this.startDate;
        },
        message: 'Renewal date must be after the start date'
    }
}
    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'] , 
        index : true 
    }

}, { timestamps: true })


subscriptionSchema.pre('save' , function(next) {
    if(!this.renewalDate) {
        this.renewalDate = new Date(this.startDate);
        if (this.frequency === 'daily') {
            this.renewalDate.setDate(this.renewalDate.getDate() + 1);
        } else if (this.frequency === 'weekly') {
            this.renewalDate.setDate(this.renewalDate.getDate() + 7);
        } else if (this.frequency === 'monthly') {
            this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
        } else if (this.frequency === 'yearly') {
            this.renewalDate.setFullYear(this.renewalDate.getFullYear() + 1);
        }
    }

    if(this.renewalDate < new Date()){
        this.status = 'inactive'; // Set status to inactive if renewal date is in the past
    }

    next();
})



const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;