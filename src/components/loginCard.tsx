"use client";
import React from "react";
import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function LoginCard() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //we need to send back email and password in formdata (username and password)
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    // for (let pair of formData.entries()) {
    //   console.log(pair[0]+ ', '+ pair[1]); 
    // } 
    //now we need to send the formdata to the server call the server function here
  }
  return (
    <form onSubmit={onSubmit}>
      <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Account Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" onChange={(e)=>setEmail(e.currentTarget.value)} placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={(e)=>setPassword(e.currentTarget.value)} required/>
          <Link href={"/forgot_password"} className="text-right text-[14px] italic underline">
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          Don&apos;t have any account?
          <Link href="/register" className="italic underline">
            sign up
          </Link>
        </div>
        <Button className="tracking-widest w-28" type="submit">LOGIN</Button>
      </CardFooter>
    </Card>
    </form>
  );
}
