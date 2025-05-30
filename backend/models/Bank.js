const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  accountHolderName: {
    type: String,
    required: true,
    trim: true
  },
  accountHolderPan: {
    type: String,
    required: false,
    trim: true
  },
  accountHolderAadhar: {
    type: String,
    required: false,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  ifscCode: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  branchName: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    enum: ['savings', 'current', 'fixed_deposit'],
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'ownerType',
  },
  ownerType: {
    type: String,
    enum: ['Company', 'Broker'],
  },
  customFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bankSchema.index({ accountNumber: 1 });
bankSchema.index({ ifscCode: 1 });
bankSchema.index({ isActive: 1 });
bankSchema.index({ owner: 1 });
bankSchema.index({ ownerType: 1 });

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank; 