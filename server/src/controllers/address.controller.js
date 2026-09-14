const mongoose = require("mongoose");
const Address = require("../models/address.model");

const getMyAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const addresses = await Address.find({
      user: userId,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    console.error("Get addresses failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
    });
  }
};

const createAddress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      label,
      recipientName,
      phone,
      addressLine1,
      addressLine2,
      area,
      city,
      postalCode,
      country = "Bangladesh",
      isDefault = false,
    } = req.body;

    if (
      !label ||
      !recipientName ||
      !phone ||
      !addressLine1 ||
      !area ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Label, recipient name, phone, address, area and city are required",
      });
    }

    const existingAddressCount = await Address.countDocuments({
      user: userId,
    });

    const shouldBeDefault =
      isDefault === true || existingAddressCount === 0;

    if (shouldBeDefault) {
      await Address.updateMany(
        { user: userId },
        { $set: { isDefault: false } },
      );
    }

    const address = await Address.create({
      user: userId,
      label,
      recipientName,
      phone,
      addressLine1,
      addressLine2,
      area,
      city,
      postalCode,
      country,
      isDefault: shouldBeDefault,
    });

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.error("Create address failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add address",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const address = await Address.findOne({
      _id: id,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const {
      label,
      recipientName,
      phone,
      addressLine1,
      addressLine2,
      area,
      city,
      postalCode,
      country,
      isDefault,
    } = req.body;

    if (label !== undefined) address.label = label;
    if (recipientName !== undefined) address.recipientName = recipientName;
    if (phone !== undefined) address.phone = phone;
    if (addressLine1 !== undefined) address.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) address.addressLine2 = addressLine2;
    if (area !== undefined) address.area = area;
    if (city !== undefined) address.city = city;
    if (postalCode !== undefined) address.postalCode = postalCode;
    if (country !== undefined) address.country = country;

    if (isDefault === true) {
      await Address.updateMany(
        {
          user: userId,
          _id: { $ne: id },
        },
        {
          $set: { isDefault: false },
        },
      );

      address.isDefault = true;
    }

    await address.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Update address failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update address",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const address = await Address.findOne({
      _id: id,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    await Address.deleteOne({
      _id: id,
      user: userId,
    });

    if (address.isDefault) {
      const nextAddress = await Address.findOne({
        user: userId,
      }).sort({
        createdAt: -1,
      });

      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete address",
    });
  }
};

const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const address = await Address.findOne({
      _id: id,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } },
    );

    address.isDefault = true;

    await address.save();

    return res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Set default address failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to set default address",
    });
  }
};

module.exports = {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};