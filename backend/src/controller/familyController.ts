import express from "express";

import {
  createMember,
  getMembers,
  getMembersByName,
  updateMemberById,
  deleteMemberById,
  getMembersById,
} from "../models/familyModel";

export const createNewMember = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, age, role, birthday } = req.body;

    if (!req.body) {
      return res.status(400).send("No Data Found");
    }

    const validMember = await getMembersByName(name);
    if (validMember) {
      return res.status(400).send(`${name} is already exisiting`);
    }

    const member = await createMember({
      name,
      age,
      role,
      birthday,
    });

    return res.status(200).json(member);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const getAllMembers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const members = await getMembers();

    return res.status(200).json(members);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const updateMember = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const memberData = req.body;

    if (!memberData) {
      return res.status(400).send("No Data Found");
    }

    const updatedMember = await updateMemberById(id, memberData);

    return res.status(200).json(updatedMember);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const deleteMember = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const validMember = await getMembersById(id);

    if (!validMember) {
      return res.status(400).send("User is not found");
    }

    const deletedUser = await deleteMemberById(id, { isDeleted: true });

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
