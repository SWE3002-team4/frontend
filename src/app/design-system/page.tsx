import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-surface-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
              Design Library
            </h1>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
          <p className="text-lg text-surface-600 dark:text-surface-400">
            A basic set of modular UI components built with Tailwind CSS v4.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
            Buttons
          </h2>
          <div className="flex flex-wrap items-end gap-6">
            <div className="space-y-2">
              <span className="text-sm font-medium text-surface-500">Primary</span>
              <div className="flex gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-surface-500">Secondary</span>
              <div className="flex gap-4">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large</Button>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-surface-500">Outline</span>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">Small</Button>
                <Button variant="outline" size="md">Medium</Button>
                <Button variant="outline" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
            Inputs
          </h2>
          <div className="grid max-w-sm gap-4">
            <Input placeholder="Default input..." />
            <Input defaultValue="Filled value" />
            <Input placeholder="Disabled input..." disabled />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
            Cards
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-surface-600 dark:text-surface-400">
                  This is a basic card component. It supports headers and content areas.
                </p>
                <Button variant="primary" className="w-full">Action</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Login Example</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Email address" type="email" />
                <Input placeholder="Password" type="password" />
                <Button variant="primary" className="w-full">Sign In</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
