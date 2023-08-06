import '@/lib/api-functions/db';
import Dashboard from './model';
import { Tag, Note } from '@/types';

export const fetchDashboards = async (query={}) => {
  return await Dashboard.find(query).exec();
}

export const fetchDashboard = async (userId: string | string[] | undefined) => {
  return await Dashboard.findOne({owner: userId}).exec();
};

export const createDashboard = async (userId: string | string[] | undefined) => {
  const newDashboard = new Dashboard({
    owner: userId,
    NOTES: [],
    TAGS: [],
  });
  const result = await newDashboard.save();
  return result;
};

export const updateNotes = async (userId:string | string[] | undefined, notesArr: Note[]) => {
  const result = await Dashboard.findOneAndUpdate(
    { owner: userId },
    { $set: { NOTES: notesArr } },
    { new: true }
  )
  return result;
}

export const updateTags = async (userId:string | string[] | undefined, tagsArr: Tag[]) => {
  const result = await Dashboard.findOneAndUpdate(
    { owner: userId },
    { $set: { TAGS: tagsArr } },
    { new: true }
  )
  return result;
}
