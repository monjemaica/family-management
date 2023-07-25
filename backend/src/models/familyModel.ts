import mongoose from "mongoose";

const FamilySchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
  role: { type: String, require: true },
  birthday: { type: String, require: true },
  isDeleted: { type: Boolean, default: false },
});

export const FamilyModel = mongoose.model("Family", FamilySchema);

export const createMember = (values: Record<string, any>) =>
  new FamilyModel(values).save().then((user) => user.toObject());

export const getMembers = () => FamilyModel.find();

export const getMembersById = (id: String) => FamilyModel.findById(id);

export const getMembersByName = (name: String) => FamilyModel.findOne({ name });

export const updateMemberById = (id: String, values: Record<string, any>) => FamilyModel.findByIdAndUpdate(id, values, { new: true });

export const deleteMemberById = (id: String, values: Record<string, any>) => FamilyModel.findByIdAndUpdate(id, values, { new: true });
