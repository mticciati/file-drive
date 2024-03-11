"use client";

import { Button } from '@/components/ui/button';
import {
  SignedIn,
  useOrganization,
  useUser,
} from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import useStoreUserEffect from '@/hooks/useStoreUserEffect';

export default function Home() {
  const organization = useOrganization();
  const userId = useStoreUserEffect();
  let ownerId: string = '';
  if (organization.isLoaded && userId) {
    ownerId = organization.organization?.id 
      ? organization.organization.id 
      : userId;
  }

  const files = useQuery(
    api.files.getFiles,
    ownerId ? { ownerId } : 'skip',
  );
  const createFile = useMutation(api.files.createFile);

  console.log('OWNER ID', ownerId);
   
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <SignedIn>
        {files?.map((file) => {
          return <div key={file._id}>{file.name}</div>;
        })}

        {ownerId.length > 0 && (
          <Button onClick={() => {
            createFile({
              name: 'hello world',
              ownerId,
            });
          }}
          >
            Click Me
          </Button>
        )}
      </SignedIn>
      
    </main>
  );
}
