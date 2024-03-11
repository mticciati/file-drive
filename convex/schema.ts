import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  files: defineTable({ 
    name: v.string(),
    ownerId: v.string(),
  })
  .index(
    "by_ownerId",
    ['ownerId']
  ),
  
  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
    name: v.string(),
  })
  .index(
    'by_token',
  ['tokenIdentifier'],
  ),
});