'use client'
import { Drive } from "@/components/drive";
import Frame from "@/components/frame";
import { Upload } from "@/components/upload";
import { useSession, signIn } from "next-auth/react";


export default function Home() {
   
    
    return (
        <div>
            <Drive />
            <Frame />
            <Upload />

        </div>

    );
}
