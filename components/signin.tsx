'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { signIn } from 'next-auth/react';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid credentials, please try again.');
    } else if (result?.ok) {
      router.push('/home');
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="flex h-20 items-center justify-between px-6 border-b">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <HardDriveDownloadIcon className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold text-foreground">Arc</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-2">
            <HardDriveDownloadIcon className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to Arc Drive</h1>
            <p className="text-muted-foreground">Secure and effortless file storage and sharing.</p>
          </div>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Sign In</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col sm:flex-row items-center justify-between py-6 w-full px-4 md:px-6 border-t">
        <p className="text-xs text-[#666] flex-1 text-left">&copy; 2024 Drive App. All rights reserved.</p>
        <p className="text-xs text-[#666] mx-auto">Developed By Harsh</p>
        <nav className="flex-1 flex justify-end gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Github
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

// Page component that uses SignIn

export default function SignInPage() {
  return <SignIn />;
}




function HardDriveDownloadIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-hard-drive-download"
    >
      <path d="M12 2v8" />
      <path d="M16 6L12 10 8 6" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h.01" />
      <path d="M10 18h.01" />
    </svg>
  )
}
