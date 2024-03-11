import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { api, internal } from './_generated/api';

const http = httpRouter();

http.route({
	path: '/clerk',
	method: 'POST',
	handler: httpAction(async (ctx, request) => {
		const payloadString = await request.text();
		const headerPayload = request.headers;

		try {
			const result = await ctx.runAction(internal.clerk.fulfill, {
				payload: payloadString,
				headers: {
					"svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
				}
			});

			switch(result.type) {
					case 'user.created': 
					console.log("server identity from user.created", await ctx.auth.getUserIdentity());
						await ctx.runMutation(api.users.createUser, {
							// tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.id}`,
						});
						break;
					// case 'organizationMembership.created':

			}

			return new Response(null, {
        status: 200,
      });
		} catch(error) {
			return new Response("Webhook Error", {
        status: 400,
      });
		}
	})
});

export default http;