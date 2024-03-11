import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile = mutation({
	args: {
		name: v.string(),
		ownerId: v.string(),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError('you must be logged in to create a file!');
		}
		await ctx.db.insert('files', {
			name: args.name,
			ownerId: args.ownerId,
		});
	}
});

export const getFiles = query({
	args: {
		ownerId: v.string(),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return [];
		}
		return ctx.db.query('files')
			.withIndex('by_ownerId', q => q.eq('ownerId', args.ownerId))
			.collect();
	}
})