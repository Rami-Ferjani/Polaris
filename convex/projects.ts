import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("projects", {
      name: args.name,
      ownerId: "123",
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    await ctx.db.get("projects").collect();
  },
});
