'use client'
import { Drive } from "@/components/drive";
import Frame from "@/components/frame";
import { Upload } from "@/components/upload";
import { useSession, signIn } from "next-auth/react";


export default function Home() {
    const { data: session, status } = useSession();

    // Check if the session status is loading and show a loader
    if (status === "loading") {
        return <div>Loading...</div>; // Simple text loader, can be replaced with a spinner or other visual indicator
    }
    
    if (!session) {
        return (
            <div>
                <p>You are not signin. Please Sign in to continue</p>
                <button onClick={() => signIn()}> SignIn</button>
            </div>
        )
    }
    
    return (
        <div>
            <Drive session={session}/>
            <Frame />
            <Upload />

        </div>

    );
}
