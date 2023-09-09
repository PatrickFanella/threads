"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { userValidation } from "@/lib/validations/user";
import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}
export default function AccountProfile({ user, btnTitle }: Props) {
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profilePhoto: "",
      name: "",
      username: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof userValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 space-y-8"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="object-contain rounded-full"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
