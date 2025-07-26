"use client";

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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { RegisterSchema } from "@/app/zodschema/userSchema";
import { Button } from "@/components/ui/button";
import { signupUser } from "@/app/actions/actions";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirm: "",
    },
  });

  const { isSubmitting } = useFormState({
    control: form.control,
  });

  async function onSubmit(values) {
    try {
      const response = await signupUser(values);
      form.reset();
      toast.success(response);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[540px] px-10 h-fit py-5">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="mobile number" {...field} />
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
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ConfirmPassword</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="confirm Password"
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
                <Button type="submit" className="cursor-pointer"> Submit </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex gap-2 text-sm justify-center items-center">
          <Label>Already have an account?</Label>
          <Link href={"/auth/signIn"} className="text-blue-500">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
