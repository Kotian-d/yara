"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { LoginSchema } from "@/app/zodschema/userSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signInUser } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function signIn() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  const { isSubmitting } = useFormState({
    control: form.control,
  });

  async function onSubmit(values) {
    try {
      await signInUser(values);
      router.push(`/user/dashboard`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[480px] px-10 h-fit py-5">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">
            login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile number</FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile no" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isSubmitting ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting.....
                </Button>
              ) : (
                <Button type="submit" className="cursor-pointer">
                  {" "}
                  Submit{" "}
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex gap-2 text-sm">
          <Label>Don't have an account?</Label>
          <Link href={"/auth/signup"} className="text-blue-500">
            Signup
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
