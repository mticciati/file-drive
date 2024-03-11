import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header() {
	return (
		<section className="border-b py-4 bg-gray-50">
			<div className="container mx-auto justify-between flex items-center">
				<div>FileDrive</div>
				<div className="flex gap-2 justify-end">
					<OrganizationSwitcher />
					<UserButton />
					<SignedOut>
						<SignInButton mode="modal">
							<Button>Sign In</Button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</section>
	)
}