import { Metadata } from "next";
import React from "react";
import { UserForm } from "./form";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <section className="p-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">User account</h1>
        <p className="text-muted-foreground text-sm">
          Update your photo and personal details here.
        </p>
      </div>

      <UserForm
        name={session?.user.name}
        image={session?.user.image}
        email={session?.user.email}
      />
    </section>
  );
};

export default SettingsPage;
