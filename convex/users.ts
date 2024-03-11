import { v } from 'convex/values';
import { internalMutation, mutation } from './_generated/server';

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */

export const createUser = mutation({
	args: {},
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();

		console.log('IDENTITY', identity);

		if (!identity) {
			throw new Error('Cannot store user without authentication present');
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_token', q => q.eq('tokenIdentifier', identity.tokenIdentifier))
			.unique();

		if (user !== null) {
			// patch user? 
			return user._id;
		}

		return await ctx.db.insert('users', {
			tokenIdentifier: identity.tokenIdentifier,
			orgIds: [],
			name: identity.name!
		});
	}
})

